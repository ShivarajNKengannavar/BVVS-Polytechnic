require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import database pool
const pool = require('./data/db');
const data = require('./data/bvvs.data');

const homeRoutes = require('./routes/home.routes');
const aboutRoutes = require('./routes/about.routes');
const academicsRoutes = require('./routes/academics.routes');
const examinationsRoutes = require('./routes/examinations.routes');
const studentLifeRoutes = require('./routes/studentLife.routes');
const administrationRoutes = require('./routes/administration.routes');
const admissionRoutes = require('./routes/admission.routes');
const placementRoutes = require('./routes/placement.routes');
const adminRoutes = require('./routes/admin.routes');

function createApp() {
  const app = express();
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

  const allowedOrigins = [
    FRONTEND_URL,
    'http://localhost:4200',
    'http://127.0.0.1:4200'
  ];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests or tools that don't send Origin header.
      if (!origin) {
        return callback(null, true);
      }

      const isAllowedConfiguredOrigin = allowedOrigins.includes(origin);
      const isAllowedLocalhostPort = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
      const isFirebaseHostingDomain = /^https:\/\/[a-z0-9-]+\.(web\.app|firebaseapp\.com)$/.test(origin);

      if (isAllowedConfiguredOrigin || isAllowedLocalhostPort || isFirebaseHostingDomain) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  }));
  app.use(express.json());

  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Public API Routes
  app.use('/api/home', homeRoutes);
  app.use('/api/about', aboutRoutes);
  app.use('/api/academics', academicsRoutes);
  app.use('/api/examinations', examinationsRoutes);
  app.use('/api/student-life', studentLifeRoutes);
  app.use('/api/administration', administrationRoutes);
  app.use('/api/admission', admissionRoutes);
  app.use('/api/placement', placementRoutes);

  // Admin Routes (protected by JWT)
  app.use('/api/admin', adminRoutes);
  app.use('/api/auth', adminRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'BVVS API running', timestamp: new Date() });
  });

  return app;
}

async function initContentTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS home_notices (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      url TEXT DEFAULT '#',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS exam_circulars (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      url TEXT NOT NULL,
      label TEXT DEFAULT 'Download',
      icon VARCHAR(16) DEFAULT '📢',
      published_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_documents (
      id BIGSERIAL PRIMARY KEY,
      original_name TEXT NOT NULL,
      filename TEXT NOT NULL,
      url TEXT NOT NULL,
      category VARCHAR(100) DEFAULT 'general',
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      size BIGINT DEFAULT 0
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY,
      college_name TEXT NOT NULL,
      phone VARCHAR(64) DEFAULT '',
      email VARCHAR(255) DEFAULT '',
      address TEXT DEFAULT '',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const noticeCount = await pool.query('SELECT COUNT(*)::int AS count FROM home_notices');
  if (noticeCount.rows[0].count === 0) {
    for (const notice of data.notices) {
      await pool.query(
        'INSERT INTO home_notices (text, url) VALUES ($1, $2)',
        [notice.text, notice.url || '#']
      );
    }
  }

  const circularCount = await pool.query('SELECT COUNT(*)::int AS count FROM exam_circulars');
  if (circularCount.rows[0].count === 0) {
    for (const circular of data.examinations.circulars) {
      await pool.query(
        `INSERT INTO exam_circulars (title, description, url, label, icon, published_date)
         VALUES ($1, $2, $3, $4, $5, NULL)`,
        [
          circular.title,
          circular.description || '',
          circular.docUrl || circular.url,
          circular.label || 'Download',
          circular.icon || '📢'
        ]
      );
    }
  }

  const settingsCount = await pool.query('SELECT COUNT(*)::int AS count FROM site_settings');
  if (settingsCount.rows[0].count === 0) {
    await pool.query(
      `INSERT INTO site_settings (id, college_name, phone, email, address)
       VALUES (1, $1, $2, $3, $4)`,
      [
        'B.V.V.S. Polytechnic (Autonomous), Bagalkot',
        '08354-220879',
        'principal.bvvsp@gmail.com',
        'Bachi-Raichur Hwy, Kaulpet, Bagalkot, Karnataka 587101'
      ]
    );
  }
}

module.exports = {
  createApp,
  initContentTables
};
