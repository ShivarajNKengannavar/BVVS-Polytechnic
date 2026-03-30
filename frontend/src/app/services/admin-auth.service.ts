import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const API = environment.apiUrl;

interface LoginResponse {
  token: string;
  username: string;
  email: string;
  role: string;
  fullName: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  public loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  public userRole = new BehaviorSubject<string>(this.getUserRoleFromStorage());

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('bvvs_admin_token');
  }

  private getUserRoleFromStorage(): string {
    return localStorage.getItem('bvvs_admin_role') || 'user';
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:3001/api/auth/login`, { username, password }).pipe(
      tap((res: LoginResponse) => {
        localStorage.setItem('bvvs_admin_token', res.token);
        localStorage.setItem('bvvs_admin_user', res.username);
        localStorage.setItem('bvvs_admin_email', res.email);
        localStorage.setItem('bvvs_admin_role', res.role);
        localStorage.setItem('bvvs_admin_fullname', res.fullName);
        this.loggedIn$.next(true);
        this.userRole.next(res.role);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('bvvs_admin_token');
    localStorage.removeItem('bvvs_admin_user');
    localStorage.removeItem('bvvs_admin_email');
    localStorage.removeItem('bvvs_admin_role');
    localStorage.removeItem('bvvs_admin_fullname');
    this.loggedIn$.next(false);
    this.userRole.next('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('bvvs_admin_token');
  }

  getUsername(): string {
    return localStorage.getItem('bvvs_admin_user') || 'User';
  }

  getEmail(): string {
    return localStorage.getItem('bvvs_admin_email') || '';
  }

  getUserFullName(): string {
    return localStorage.getItem('bvvs_admin_fullname') || this.getUsername();
  }

  getUserRole(): string {
    return localStorage.getItem('bvvs_admin_role') || 'user';
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getUserRole$(): Observable<string> {
    return this.userRole.asObservable();
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  hasRoles(roles: string[]): boolean {
    return roles.includes(this.getUserRole());
  }

  verify(): Observable<any> {
    return this.http.get(`${API}/auth/verify`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }
}
