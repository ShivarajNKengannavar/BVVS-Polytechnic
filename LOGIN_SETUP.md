# BVVS Login System Setup Guide

## Overview
The BVVS project now includes a complete authentication system with:
- User database with roles (admin, faculty, staff, moderator)
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Login UI page

## Database Setup

### 1. Create PostgreSQL Database
```bash
createdb bvvs_admin
```

### 2. Create Users Table
Run the SQL initialization script:
```bash
psql -U postgres -d bvvs_admin -f backend/src/data/initUsers.sql
```

This creates:
- `users` table with authentication fields
- `admin_users` table for admin-specific data
- Default admin and sample users

### 3. Default Users

| Username | Password | Role | Email |
|----------|----------|------|-------|
| admin | password123 | admin | admin@bvvs.edu.in |
| faculty1 | password123 | faculty | faculty1@bvvs.edu.in |
| staff1 | password123 | staff | staff1@bvvs.edu.in |
| moderator1 | password123 | moderator | moderator1@bvvs.edu.in |

⚠️ **Change these passwords in production!**

### 4. Set Database Credentials in .env
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=bvvs_admin
DB_PASSWORD=your_password
DB_PORT=5432
```

## Frontend Integration

### Login Component
Located at: `frontend/src/app/pages/admin/login/`

The login page accepts:
- Username
- Password
- Displays error messages for invalid credentials

### Auth Service
Located at: `frontend/src/app/services/admin-auth.service.ts`

Methods available:
```typescript
// Login
auth.login(username, password): Observable<LoginResponse>

// Get user info
auth.getUsername(): string
auth.getEmail(): string
auth.getUserFullName(): string
auth.getUserRole(): string

// Role-based checks
auth.hasRole('admin'): boolean
auth.hasRoles(['admin', 'faculty']): boolean

// Logout
auth.logout(): void

// Token management
auth.getToken(): string | null
auth.isLoggedIn(): boolean
```

### Observable Streams
```typescript
// Subscribe to login state
auth.loggedIn$.subscribe(isLoggedIn => { ... })

// Subscribe to role changes
auth.userRole$.subscribe(role => { ... })
```

## Backend Login Endpoint

### Endpoint
```
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "username": "admin",
  "email": "admin@bvvs.edu.in",
  "role": "admin",
  "fullName": "BVVS Administrator",
  "expiresIn": "8h"
}
```

### Error Response
```json
{
  "error": "Invalid credentials"
}
```

## Password Hashing

Passwords are hashed using bcryptjs with cost factor 10.

### Generate Hashed Password
```javascript
const bcrypt = require('bcryptjs');
const password = 'your_password';
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
```

Then insert into database:
```sql
INSERT INTO users (username, email, password_hash, role, full_name, is_active)
VALUES ('newuser', 'email@bvvs.edu.in', 'hashed_password_here', 'faculty', 'John Doe', true);
```

## JWT Token Authentication

All protected routes require Bearer token in header:
```
Authorization: Bearer your_jwt_token_here
```

Tokens expire in 8 hours. Implement refresh token mechanism for production.

## Role-Based Access Control

### Available Roles
- `admin` - Full system access
- `faculty` - Faculty-specific access
- `staff` - Staff operations
- `moderator` - Content moderation
- `user` - Basic user access

### Implement Role Guards in Angular
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from './services/admin-auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AdminAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.hasRole('admin')) {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
}
```

## Running the Application

### Start Backend
```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:3001`

### Start Frontend
```bash
cd frontend
ng serve
```

Frontend runs on: `http://localhost:4200`

### Access Login Page
Navigate to: `http://localhost:4200/admin/login`

Login with the default credentials provided above.

## Production Checklist

- [ ] Change default admin password
- [ ] Use strong password hashing (bcrypt cost ≥ 10)
- [ ] Implement refresh token mechanism
- [ ] Set up HTTPS
- [ ] Use environment variables for credentials
- [ ] Implement rate limiting on login endpoint
- [ ] Add email verification for signup
- [ ] Set up password reset mechanism
- [ ] Audit login attempts
- [ ] Enable 2FA for admin accounts
