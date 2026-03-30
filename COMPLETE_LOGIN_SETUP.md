# 🔐 BVVS Login System - Complete Setup

## What's Been Created

I've implemented a complete authentication and login system for your BVVS project with:

### 1. **Database Layer** ✅
- **File**: `backend/src/data/db.js`
  - Central PostgreSQL connection pool
  - Automatic error handling
  - Connection logging

- **File**: `backend/src/data/initUsers.sql`
  - Creates `users` table with roles (admin, faculty, staff, moderator)
  - Creates `admin_users` extended table
  - Pre-populated with sample users
  - Password hashing ready (bcrypt)

### 2. **Backend Authentication** ✅
- **File**: `backend/src/routes/admin.routes.js` (Updated)
  - New login endpoint: `POST /api/admin/login`
  - Queries database for users
  - Bcrypt password verification
  - JWT token generation with role included
  - User last-login tracking
  - Full error handling

- **Dependency**: `bcryptjs` (installed)
  - Secure password hashing
  - Password verification

### 3. **Frontend Auth Service** ✅
- **File**: `frontend/src/app/services/admin-auth.service.ts` (Enhanced)
  - Login method: stores token, email, role, full name
  - Logout method: clears all user data
  - Role management: `hasRole()`, `hasRoles()`
  - Observable streams: `loggedIn$`, `userRole`
  - User info methods: `getUsername()`, `getEmail()`, `getUserFullName()`, `getUserRole()`

### 4. **Login UI** ✅
- **Location**: `frontend/src/app/pages/admin/login/`
  - Already exists and works with updated auth service
  - Username/password form
  - Error messages
  - Loading state
  - Auto-redirect on successful login

### 5. **Utilities** ✅
- **File**: `backend/hashPassword.js`
  - CLI tool to generate bcrypt password hashes
  - Usage: `node hashPassword.js "password"`
  - Output: hash ready for database INSERT

## Database Setup Instructions

### Step 1: Create Database
```bash
createdb bvvs_admin
```

### Step 2: Initialize Tables & Users
```bash
psql -U postgres -d bvvs_admin -f backend/src/data/initUsers.sql
```

### Step 3: Configure .env
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=bvvs_admin
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=bvvs_super_secret_jwt_key_2025_polytechnic
ADMIN_USERNAME=admin
ADMIN_PASSWORD=bvvs@2025
```

## Default Test Credentials

| Username | Password | Role | Email |
|----------|----------|------|-------|
| **admin** | password123 | admin | admin@bvvs.edu.in |
| faculty1 | password123 | faculty | faculty1@bvvs.edu.in |
| staff1 | password123 | staff | staff1@bvvs.edu.in |
| moderator1 | password123 | moderator | moderator1@bvvs.edu.in |

⚠️ **IMPORTANT**: Change these passwords immediately in production!

## How to Use

### 1. Start Backend
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3001`

### 2. Start Frontend
```bash
cd frontend
ng serve
```
Frontend runs on: `http://localhost:4200`

### 3. Navigate to Login
Open: `http://localhost:4200/admin/login`

Login with credentials above → Redirects to `/admin/dashboard`

## API Response Example

### Login Request
```bash
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

### Login Response (Success)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "email": "admin@bvvs.edu.in",
  "role": "admin",
  "fullName": "BVVS Administrator",
  "expiresIn": "8h"
}
```

### Login Response (Failure)
```json
{
  "error": "Invalid credentials"
}
```

## Adding New Users

### Method 1: Using CLI Hash Utility
```bash
# Generate hash for password
cd backend
node hashPassword.js "myNewPassword123"

# Copy the output hash
```

Then in PostgreSQL:
```sql
INSERT INTO users (username, email, password_hash, role, full_name, is_active)
VALUES ('newuser', 'newuser@bvvs.edu.in', 'PASTE_HASH_HERE', 'faculty', 'John Doe', true);
```

### Method 2: Direct SQL (if already have hash)
```sql
INSERT INTO users (username, email, password_hash, role, full_name, is_active)
VALUES ('username', 'email@bvvs.edu.in', 'bcrypt_hash', 'role', 'Full Name', true);
```

## Role-Based Access Control

Use in your Angular components:

```typescript
constructor(private auth: AdminAuthService) {}

// Check single role
if (this.auth.hasRole('admin')) { ... }

// Check multiple roles
if (this.auth.hasRoles(['admin', 'faculty'])) { ... }

// Get role
const role = this.auth.getUserRole();

// Subscribe to role changes
this.auth.userRole.subscribe(role => { ... });
```

## Protected Routes Example

Create a guard:
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from './services/admin-auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AdminAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.hasRole('admin')) return true;
    this.router.navigate(['/admin/login']);
    return false;
  }
}
```

Use in routing:
```typescript
{
  path: 'admin/dashboard',
  component: DashboardComponent,
  canActivate: [AdminGuard]
}
```

## Environment Setup

Frontend (`frontend/src/environments/environment.ts`):
```typescript
export const environment = {
  apiUrl: 'http://localhost:3001/api'
};
```

Backend (.env):
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:4200
JWT_SECRET=bvvs_super_secret_jwt_key_2025_polytechnic
DB_USER=postgres
DB_HOST=localhost
DB_NAME=bvvs_admin
DB_PASSWORD=postgres
DB_PORT=5432
```

## Features Implemented

✅ User database with roles
✅ Secure password hashing (bcrypt)
✅ JWT authentication (8-hour tokens)
✅ Login/Logout functionality
✅ Role-based access control
✅ User profile info (email, full name, role)
✅ Login tracking (last_login timestamp)
✅ Error handling & validation
✅ Password verification service
✅ Utility for password hash generation
✅ Comprehensive documentation

## Next Steps (Optional Enhancements)

- [ ] Add "Forgot Password" functionality
- [ ] Implement email verification on signup
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Create user management dashboard
- [ ] Implement refresh tokens (extend session)
- [ ] Add login activity audit log
- [ ] Rate limiting on login attempts
- [ ] Email notifications for login
- [ ] User role & permission management UI
- [ ] Session management UI

## Files Modified/Created

### Created:
- `backend/src/data/db.js` - Database connection module
- `backend/src/data/initUsers.sql` - Database initialization
- `backend/hashPassword.js` - Password hashing utility
- `LOGIN_SETUP.md` - Detailed setup guide

### Updated:
- `backend/src/server.js` - Uses new db module
- `backend/src/routes/admin.routes.js` - Database-backed auth
- `frontend/src/app/services/admin-auth.service.ts` - Enhanced with roles

### Unchanged (Already working):
- `frontend/src/app/pages/admin/login/` - Login component
- Angular routing & components

---

**Ready to test?** Follow the "Database Setup Instructions" above! 🚀
