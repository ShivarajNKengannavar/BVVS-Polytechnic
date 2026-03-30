const { Pool } = require('pg');

// Create database connection pool

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

pool.connect()
  .then(() => console.log('✅ PostgreSQL Connected'))
  .catch(err => console.warn('⚠️  Database warning:', err.message));

module.exports = pool;
