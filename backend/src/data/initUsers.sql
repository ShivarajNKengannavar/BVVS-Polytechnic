-- Create users table for authentication with roles
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  full_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin table for admin-specific data
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  department VARCHAR(100),
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default users (all seeded users use password: password123)
-- Note: In production, replace seeded hashes with securely managed credentials
INSERT INTO users (username, email, password_hash, role, full_name, is_active)
VALUES (
  'admin',
  'admin@bvvs.edu.in',
  '$2a$10$3EADFyUjc.HcaGmZO.08Pex7CSrICY.Iuu6DytyPTp9VmaHqD87pG', -- bcrypt hash of 'password123'
  'admin',
  'BVVS Administrator',
  true
) ON CONFLICT (username) DO NOTHING;

-- Add admin user to admin_users table
INSERT INTO admin_users (user_id, department, permissions)
SELECT id, 'Administration', '{"manage_users": true, "manage_content": true, "manage_settings": true}'
FROM users WHERE username = 'admin'
ON CONFLICT (user_id) DO NOTHING;
