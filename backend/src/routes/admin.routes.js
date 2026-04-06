const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth.middleware');
const pool = require('../data/db');
const data = require('../data/bvvs.data');

// ── File upload config ───────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}_${safeName}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.rar', '.zip'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('File type not allowed'));
  }
});

// ── In-memory store for admin-managed content ────────────────────
// In production, replace with MongoDB/PostgreSQL
let adminData = {
  notices: [...data.notices],
  circulars: [
    { id: 1, title: 'Exam Circular May 2025',       url: 'https://bvvspolytech.com/pdf/exam_circular_may_25.pdf',   date: '2025-04-10' },
    { id: 2, title: 'Exam Postponement Notice',      url: 'https://bvvspolytech.com/downloads/exampostpone.pdf',     date: '2025-10-15' },
    { id: 3, title: 'Exam Form Notice Nov 2025',     url: 'https://bvvspolytech.com/downloads/examformnoticenov2025.jpg', date: '2025-09-01' }
  ],
  documents: [],
  settings: {
    collegeName: 'B.V.V.S. Polytechnic (Autonomous), Bagalkot',
    phone: '08354-220879',
    email: 'principal.bvvsp@gmail.com',
    address: 'Bachi-Raichur Hwy, Kaulpet, Bagalkot, Karnataka 587101'
  }
};

// ── Admin credentials (in production, use DB with hashed passwords) ─
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'password123'
};

let departmentsInitialized = false;

function normalizeDepartmentPayload(input = {}, fallback = {}) {
  const toArray = (value, fallbackValue = []) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return fallbackValue;
  };

  const name = (input.name ?? fallback.name ?? '').toString().trim();
  const shortName = (input.shortName ?? input.short_name ?? fallback.shortName ?? '').toString().trim();

  return {
    id: (input.id ?? fallback.id ?? '').toString().trim(),
    name,
    shortName,
    icon: (input.icon ?? fallback.icon ?? '').toString().trim() || '🎓',
    image: (input.image ?? fallback.image ?? '').toString().trim(),
    duration: (input.duration ?? fallback.duration ?? '3 Years').toString().trim(),
    description: (input.description ?? fallback.description ?? '').toString().trim(),
    fullDescription: (input.fullDescription ?? input.full_description ?? fallback.fullDescription ?? '').toString().trim(),
    subjects: toArray(input.subjects, fallback.subjects || []),
    faculty: input.faculty ?? fallback.faculty ?? null,
    syllabus: toArray(input.syllabus, fallback.syllabus || [])
  };
}

function toDepartmentRow(dept, order) {
  return [
    dept.id,
    dept.name,
    dept.shortName || null,
    dept.icon || '🎓',
    dept.image || null,
    dept.duration || '3 Years',
    dept.description || '',
    dept.fullDescription || '',
    JSON.stringify(dept.subjects || []),
    dept.faculty ? JSON.stringify(dept.faculty) : null,
    JSON.stringify(dept.syllabus || []),
    typeof order === 'number' ? order : 0,
    true
  ];
}

function mapDepartment(row) {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    icon: row.icon,
    image: row.image,
    duration: row.duration,
    description: row.description,
    fullDescription: row.full_description,
    subjects: row.subjects || [],
    faculty: row.faculty,
    syllabus: row.syllabus || []
  };
}

function toDepartmentId(seed = '') {
  return seed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

async function ensureDepartmentsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_departments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      short_name TEXT,
      icon TEXT,
      image TEXT,
      duration TEXT,
      description TEXT,
      full_description TEXT,
      subjects JSONB DEFAULT '[]'::jsonb,
      faculty JSONB,
      syllabus JSONB DEFAULT '[]'::jsonb,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  if (departmentsInitialized) return;

  const countResult = await pool.query('SELECT COUNT(*)::int AS count FROM admin_departments');
  const currentCount = countResult.rows[0]?.count || 0;

  if (currentCount === 0 && Array.isArray(data.departments)) {
    for (let i = 0; i < data.departments.length; i += 1) {
      const source = normalizeDepartmentPayload(data.departments[i]);
      const id = source.id || toDepartmentId(source.name || `department-${i + 1}`);
      if (!id || !source.name) continue;

      await pool.query(
        `INSERT INTO admin_departments
          (id, name, short_name, icon, image, duration, description, full_description, subjects, faculty, syllabus, display_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10::jsonb, $11::jsonb, $12, $13)
         ON CONFLICT (id) DO NOTHING`,
        toDepartmentRow({ ...source, id }, i)
      );
    }
  }

  departmentsInitialized = true;
}

// ══════════════════════════════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════════════════════════════

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Query user from database
    const userResult = await pool.query(
      'SELECT id, username, email, password_hash, role, full_name FROM users WHERE username = $1 AND is_active = true',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Verify password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token with user info including role
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Update last_login timestamp
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    res.json({
      token,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
      expiresIn: '8h'
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// POST /api/admin/logout
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// GET /api/admin/verify
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// ══════════════════════════════════════════════════════════════════
//  NOTICES MANAGEMENT
// ══════════════════════════════════════════════════════════════════

router.get('/notices', authMiddleware, (req, res) => {
  pool.query(
    'SELECT id, text, url FROM home_notices ORDER BY created_at DESC, id DESC'
  )
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Admin notices read error:', err);
      res.status(500).json({ error: 'Failed to load notices' });
    });
});

router.post('/notices', authMiddleware, async (req, res) => {
  const { text, url } = req.body;
  if (!text) return res.status(400).json({ error: 'Notice text required' });

  try {
    const result = await pool.query(
      'INSERT INTO home_notices (text, url) VALUES ($1, $2) RETURNING id, text, url',
      [text, url || '#']
    );
    return res.json({ success: true, notice: result.rows[0] });
  } catch (err) {
    console.error('Admin notices create error:', err);
    return res.status(500).json({ error: 'Failed to add notice' });
  }
});

router.put('/notices/:index', authMiddleware, async (req, res) => {
  const idx = parseInt(req.params.index);
  if (Number.isNaN(idx) || idx < 0) return res.status(400).json({ error: 'Invalid notice index' });

  try {
    const idResult = await pool.query(
      'SELECT id FROM home_notices ORDER BY created_at DESC, id DESC OFFSET $1 LIMIT 1',
      [idx]
    );
    if (!idResult.rows.length) return res.status(404).json({ error: 'Notice not found' });

    const targetId = idResult.rows[0].id;
    const nextText = req.body.text;
    const nextUrl = req.body.url;

    const updated = await pool.query(
      'UPDATE home_notices SET text = COALESCE($1, text), url = COALESCE($2, url) WHERE id = $3 RETURNING id, text, url',
      [nextText, nextUrl, targetId]
    );

    return res.json({ success: true, notice: updated.rows[0] });
  } catch (err) {
    console.error('Admin notices update error:', err);
    return res.status(500).json({ error: 'Failed to update notice' });
  }
});

router.delete('/notices/:index', authMiddleware, async (req, res) => {
  const idx = parseInt(req.params.index);
  if (Number.isNaN(idx) || idx < 0) return res.status(400).json({ error: 'Invalid notice index' });

  try {
    const idResult = await pool.query(
      'SELECT id FROM home_notices ORDER BY created_at DESC, id DESC OFFSET $1 LIMIT 1',
      [idx]
    );
    if (!idResult.rows.length) return res.status(404).json({ error: 'Notice not found' });

    await pool.query('DELETE FROM home_notices WHERE id = $1', [idResult.rows[0].id]);
    return res.json({ success: true });
  } catch (err) {
    console.error('Admin notices delete error:', err);
    return res.status(500).json({ error: 'Failed to delete notice' });
  }
});

// ══════════════════════════════════════════════════════════════════
//  CIRCULARS MANAGEMENT
// ══════════════════════════════════════════════════════════════════

router.get('/circulars', authMiddleware, (req, res) => {
  pool.query(`
    SELECT id, title, url, TO_CHAR(published_date, 'YYYY-MM-DD') AS date, description, label, icon
    FROM exam_circulars
    ORDER BY COALESCE(published_date, created_at::date) DESC, id DESC
  `)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Admin circulars read error:', err);
      res.status(500).json({ error: 'Failed to load circulars' });
    });
});

router.post('/circulars', authMiddleware, async (req, res) => {
  const { title, url, date } = req.body;
  if (!title || !url) return res.status(400).json({ error: 'Title and URL required' });

  try {
    const created = await pool.query(
      `INSERT INTO exam_circulars (title, description, url, label, icon, published_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, url, TO_CHAR(published_date, 'YYYY-MM-DD') AS date, description, label, icon`,
      [
        title,
        req.body.description || '',
        url,
        req.body.label || 'Download',
        req.body.icon || '📢',
        date || null
      ]
    );

    return res.json({ success: true, circular: created.rows[0] });
  } catch (err) {
    console.error('Admin circulars create error:', err);
    return res.status(500).json({ error: 'Failed to add circular' });
  }
});

router.put('/circulars/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid circular id' });

  try {
    const updated = await pool.query(
      `UPDATE exam_circulars
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           url = COALESCE($3, url),
           label = COALESCE($4, label),
           icon = COALESCE($5, icon),
           published_date = COALESCE($6::date, published_date)
       WHERE id = $7
       RETURNING id, title, url, TO_CHAR(published_date, 'YYYY-MM-DD') AS date, description, label, icon`,
      [
        req.body.title,
        req.body.description,
        req.body.url,
        req.body.label,
        req.body.icon,
        req.body.date,
        id
      ]
    );

    if (!updated.rows.length) return res.status(404).json({ error: 'Circular not found' });
    return res.json({ success: true, circular: updated.rows[0] });
  } catch (err) {
    console.error('Admin circulars update error:', err);
    return res.status(500).json({ error: 'Failed to update circular' });
  }
});

router.delete('/circulars/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid circular id' });

  try {
    const deleted = await pool.query('DELETE FROM exam_circulars WHERE id = $1 RETURNING id', [id]);
    if (!deleted.rows.length) return res.status(404).json({ error: 'Circular not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('Admin circulars delete error:', err);
    return res.status(500).json({ error: 'Failed to delete circular' });
  }
});

// ══════════════════════════════════════════════════════════════════
//  DOCUMENT UPLOAD
// ══════════════════════════════════════════════════════════════════

router.post('/upload', authMiddleware, upload.single('document'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `/uploads/${req.file.filename}`;
  const category = req.body.category || 'general';

  try {
    const inserted = await pool.query(
      `INSERT INTO admin_documents (original_name, filename, url, category, size)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, original_name AS "originalName", filename, url, category,
                 uploaded_at AS "uploadedAt", size`,
      [req.file.originalname, req.file.filename, fileUrl, category, req.file.size || 0]
    );

    return res.json({ success: true, document: inserted.rows[0] });
  } catch (err) {
    console.error('Document upload DB error:', err);
    return res.status(500).json({ error: 'Failed to save uploaded document' });
  }
});

router.get('/documents', authMiddleware, async (req, res) => {
  const { category } = req.query;

  try {
    const params = [];
    let query = `
      SELECT id,
             original_name AS "originalName",
             filename,
             url,
             category,
             uploaded_at AS "uploadedAt",
             size
      FROM admin_documents
    `;

    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY uploaded_at DESC, id DESC';

    const docs = await pool.query(query, params);
    return res.json(docs.rows);
  } catch (err) {
    console.error('Documents read error:', err);
    return res.status(500).json({ error: 'Failed to load documents' });
  }
});

router.delete('/documents/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid document id' });

  try {
    const existing = await pool.query(
      'SELECT id, filename FROM admin_documents WHERE id = $1',
      [id]
    );

    if (!existing.rows.length) return res.status(404).json({ error: 'Document not found' });

    const filePath = path.join(__dirname, '../../uploads', existing.rows[0].filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await pool.query('DELETE FROM admin_documents WHERE id = $1', [id]);
    return res.json({ success: true });
  } catch (err) {
    console.error('Document delete error:', err);
    return res.status(500).json({ error: 'Failed to delete document' });
  }
});

// ══════════════════════════════════════════════════════════════════
//  DEPARTMENTS MANAGEMENT
// ══════════════════════════════════════════════════════════════════

router.get('/departments', authMiddleware, async (req, res) => {
  try {
    await ensureDepartmentsTable();
    const result = await pool.query(
      `SELECT id, name, short_name, icon, image, duration, description, full_description, subjects, faculty, syllabus
       FROM admin_departments
       WHERE is_active = true
       ORDER BY display_order ASC, name ASC`
    );
    return res.json(result.rows.map(mapDepartment));
  } catch (err) {
    console.error('Departments read error:', err);
    return res.status(500).json({ error: 'Failed to load departments' });
  }
});

router.post('/departments', authMiddleware, async (req, res) => {
  try {
    await ensureDepartmentsTable();

    const input = normalizeDepartmentPayload(req.body);
    if (!input.name) return res.status(400).json({ error: 'Department name is required' });

    const id = input.id || toDepartmentId(input.name);
    if (!id) return res.status(400).json({ error: 'Invalid department id' });

    const orderResult = await pool.query('SELECT COALESCE(MAX(display_order), -1) + 1 AS next_order FROM admin_departments');
    const nextOrder = Number(orderResult.rows[0]?.next_order || 0);

    const created = await pool.query(
      `INSERT INTO admin_departments
        (id, name, short_name, icon, image, duration, description, full_description, subjects, faculty, syllabus, display_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10::jsonb, $11::jsonb, $12, $13)
       RETURNING id, name, short_name, icon, image, duration, description, full_description, subjects, faculty, syllabus`,
      toDepartmentRow({ ...input, id }, nextOrder)
    );

    return res.json({ success: true, department: mapDepartment(created.rows[0]) });
  } catch (err) {
    console.error('Departments create error:', err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Department ID already exists' });
    }
    return res.status(500).json({ error: 'Failed to add department' });
  }
});

router.put('/departments/:id', authMiddleware, async (req, res) => {
  try {
    await ensureDepartmentsTable();

    const current = await pool.query(
      `SELECT id, name, short_name, icon, image, duration, description, full_description, subjects, faculty, syllabus
       FROM admin_departments
       WHERE id = $1 AND is_active = true`,
      [req.params.id]
    );

    if (!current.rows.length) return res.status(404).json({ error: 'Department not found' });

    const merged = normalizeDepartmentPayload(req.body, mapDepartment(current.rows[0]));
    if (!merged.name) return res.status(400).json({ error: 'Department name is required' });

    const updated = await pool.query(
      `UPDATE admin_departments
       SET name = $1,
           short_name = $2,
           icon = $3,
           image = $4,
           duration = $5,
           description = $6,
           full_description = $7,
           subjects = $8::jsonb,
           faculty = $9::jsonb,
           syllabus = $10::jsonb,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING id, name, short_name, icon, image, duration, description, full_description, subjects, faculty, syllabus`,
      [
        merged.name,
        merged.shortName || null,
        merged.icon || '🎓',
        merged.image || null,
        merged.duration || '3 Years',
        merged.description || '',
        merged.fullDescription || '',
        JSON.stringify(merged.subjects || []),
        merged.faculty ? JSON.stringify(merged.faculty) : null,
        JSON.stringify(merged.syllabus || []),
        req.params.id
      ]
    );

    return res.json({ success: true, department: mapDepartment(updated.rows[0]) });
  } catch (err) {
    console.error('Departments update error:', err);
    return res.status(500).json({ error: 'Failed to update department' });
  }
});

router.delete('/departments/:id', authMiddleware, async (req, res) => {
  try {
    await ensureDepartmentsTable();

    const deleted = await pool.query(
      `DELETE FROM admin_departments
       WHERE id = $1
       RETURNING id`,
      [req.params.id]
    );

    if (!deleted.rows.length) return res.status(404).json({ error: 'Department not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('Departments delete error:', err);
    return res.status(500).json({ error: 'Failed to delete department' });
  }
});

// ══════════════════════════════════════════════════════════════════
//  SETTINGS MANAGEMENT
// ══════════════════════════════════════════════════════════════════

router.get('/settings', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT college_name, phone, email, address
       FROM site_settings
       WHERE id = 1
       LIMIT 1`
    );

    if (!result.rows.length) {
      return res.json(adminData.settings);
    }

    const row = result.rows[0];
    return res.json({
      collegeName: row.college_name,
      phone: row.phone,
      email: row.email,
      address: row.address
    });
  } catch (err) {
    console.error('Settings read error:', err);
    return res.status(500).json({ error: 'Failed to load settings' });
  }
});

router.put('/settings', authMiddleware, async (req, res) => {
  const next = {
    collegeName: req.body.collegeName ?? adminData.settings.collegeName,
    phone: req.body.phone ?? adminData.settings.phone,
    email: req.body.email ?? adminData.settings.email,
    address: req.body.address ?? adminData.settings.address
  };

  try {
    const updated = await pool.query(
      `INSERT INTO site_settings (id, college_name, phone, email, address, updated_at)
       VALUES (1, $1, $2, $3, $4, CURRENT_TIMESTAMP)
       ON CONFLICT (id)
       DO UPDATE SET
         college_name = EXCLUDED.college_name,
         phone = EXCLUDED.phone,
         email = EXCLUDED.email,
         address = EXCLUDED.address,
         updated_at = CURRENT_TIMESTAMP
       RETURNING college_name, phone, email, address`,
      [next.collegeName, next.phone, next.email, next.address]
    );

    const row = updated.rows[0];
    return res.json({
      success: true,
      settings: {
        collegeName: row.college_name,
        phone: row.phone,
        email: row.email,
        address: row.address
      }
    });
  } catch (err) {
    console.error('Settings update error:', err);
    return res.status(500).json({ error: 'Failed to save settings' });
  }
});

// ══════════════════════════════════════════════════════════════════
//  DASHBOARD STATS
// ══════════════════════════════════════════════════════════════════

router.get('/dashboard-stats', authMiddleware, async (req, res) => {
  try {
    await ensureDepartmentsTable();

    const [noticeCount, circularCount, documentCount, departmentCount] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM home_notices'),
      pool.query('SELECT COUNT(*)::int AS count FROM exam_circulars'),
      pool.query('SELECT COUNT(*)::int AS count FROM admin_documents'),
      pool.query('SELECT COUNT(*)::int AS count FROM admin_departments WHERE is_active = true')
    ]);
  const dbDepartmentCount = departmentCount.rows[0].count || 0;

    const dbNoticeCount = noticeCount.rows[0].count || 0;
    const dbCircularCount = circularCount.rows[0].count || 0;
    const dbDocumentCount = documentCount.rows[0].count || 0;

    // Keep dashboard useful during migration: if admin tables are empty,
    // fall back to legacy content counts already visible on public pages.
    const legacyNoticeCount = Array.isArray(data.notices) ? data.notices.length : 0;
    const legacyCircularCount = Array.isArray(data.examinations?.circulars)
      ? data.examinations.circulars.length
      : 0;
    const legacyDownloadCount = Array.isArray(data.administration?.downloads)
      ? data.administration.downloads.length
      : 0;

    // If uploads exist on disk but metadata table is empty, show the file count.
    let uploadedFileCount = 0;
    const uploadDir = path.join(__dirname, '../../uploads');
    if (fs.existsSync(uploadDir)) {
      uploadedFileCount = fs.readdirSync(uploadDir)
        .filter((name) => {
          const fullPath = path.join(uploadDir, name);
          return fs.statSync(fullPath).isFile();
        })
        .length;
    }

    res.json({
      notices: dbNoticeCount > 0 ? dbNoticeCount : legacyNoticeCount,
      circulars: dbCircularCount > 0 ? dbCircularCount : legacyCircularCount,
      documents: dbDocumentCount > 0
        ? dbDocumentCount
        : Math.max(uploadedFileCount, legacyDownloadCount),
      departments: dbDepartmentCount > 0 ? dbDepartmentCount : data.departments.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Failed to load dashboard stats' });
  }
});

module.exports = router;
