const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');
const pool = require('../data/db');

let departmentsInitialized = false;

function normalizeDepartmentPayload(input = {}) {
  return {
    id: (input.id ?? '').toString().trim(),
    name: (input.name ?? '').toString().trim(),
    shortName: (input.shortName ?? input.short_name ?? '').toString().trim(),
    icon: (input.icon ?? '').toString().trim(),
    image: (input.image ?? '').toString().trim(),
    duration: (input.duration ?? '').toString().trim(),
    description: (input.description ?? '').toString().trim(),
    fullDescription: (input.fullDescription ?? input.full_description ?? '').toString().trim(),
    subjects: Array.isArray(input.subjects) ? input.subjects : [],
    faculty: input.faculty ?? null,
    syllabus: Array.isArray(input.syllabus) ? input.syllabus : []
  };
}

function toDepartmentId(seed = '') {
  return seed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
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

async function getDepartments() {
  await ensureDepartmentsTable();
  const result = await pool.query(
    `SELECT id, name, short_name, icon, image, duration, description, full_description, subjects, faculty, syllabus
     FROM admin_departments
     WHERE is_active = true
     ORDER BY display_order ASC, name ASC`
  );
  return result.rows.map(mapDepartment);
}

router.get('/departments', async (req, res) => {
  try {
    const departments = await getDepartments();
    return res.json(departments);
  } catch (err) {
    console.warn('Academics departments DB fallback:', err.message);
    return res.json(data.departments);
  }
});

router.get('/departments/:id', async (req, res) => {
  try {
    const departments = await getDepartments();
    const dept = departments.find((d) => d.id === req.params.id);
    if (dept) return res.json(dept);
    return res.status(404).json({ error: 'Department not found' });
  } catch (err) {
    console.warn('Academics department detail DB fallback:', err.message);
    const dept = data.departments.find((d) => d.id === req.params.id);
    return dept
      ? res.json(dept)
      : res.status(404).json({ error: 'Department not found' });
  }
});
router.get('/skill-programmes', (req, res) => res.json(data.skillProgrammes));

module.exports = router;
