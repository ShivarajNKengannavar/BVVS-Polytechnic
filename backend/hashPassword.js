#!/usr/bin/env node
/**
 * Password Hasher Utility
 * Usage: node hashPassword.js "your_password"
 * 
 * Generates bcrypt password hash for database insertion
 */

const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = process.argv[2];

  if (!password) {
    console.error('Usage: node hashPassword.js "password"\n');
    console.error('Example: node hashPassword.js "mySecurePassword123"\n');
    console.error('Output: Copy the hash to INSERT statement in PostgreSQL');
    process.exit(1);
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    console.log('\n✅ Password Hash Generated:\n');
    console.log(hash);
    console.log('\n📋 Use this in SQL INSERT:\n');
    console.log(`INSERT INTO users (username, email, password_hash, role, full_name, is_active)`);
    console.log(`VALUES ('newuser', 'email@bvvs.edu.in', '${hash}', 'admin', 'Name', true);\n`);
  } catch (err) {
    console.error('Error generating hash:', err.message);
    process.exit(1);
  }
}

hashPassword();
