import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username = '';
  password = '';
  showPwd  = false;
  loading  = false;
  error    = '';
  readonly roleHints = ['student', 'faculty', 'librarian', 'admin'];

  constructor(private auth: AdminAuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.redirectByRole(this.auth.getUserRole());
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password.';
      return;
    }
    this.loading = true;
    this.error   = '';

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.redirectByRole(this.auth.getUserRole());
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Login failed. Check your credentials.';
      }
    });
  }

  private redirectByRole(role: string): void {
    const roleRouteMap: Record<string, string> = {
      admin: '/admin/dashboard',
      faculty: '/academics',
      librarian: '/library',
      student: '/student-life'
    };
    this.router.navigate([roleRouteMap[role] || '/']);
  }
}
