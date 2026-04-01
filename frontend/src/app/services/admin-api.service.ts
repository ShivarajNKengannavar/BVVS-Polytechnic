import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';
import { environment } from '../../environments/environment';

const API = environment.apiUrl.endsWith('/api')
  ? environment.apiUrl
  : `${environment.apiUrl}/api`;

@Injectable({ providedIn: 'root' })
export class AdminApiService {

  constructor(private http: HttpClient, private auth: AdminAuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  // ── Dashboard ──────────────────────────────
  getStats(): Observable<any>   { return this.http.get(`${API}/admin/dashboard-stats`, { headers: this.headers() }); }

  // ── Notices ────────────────────────────────
  getNotices(): Observable<any[]>                     { return this.http.get<any[]>(`${API}/admin/notices`, { headers: this.headers() }); }
  addNotice(data: any): Observable<any>               { return this.http.post(`${API}/admin/notices`, data, { headers: this.headers() }); }
  updateNotice(idx: number, data: any): Observable<any> { return this.http.put(`${API}/admin/notices/${idx}`, data, { headers: this.headers() }); }
  deleteNotice(idx: number): Observable<any>          { return this.http.delete(`${API}/admin/notices/${idx}`, { headers: this.headers() }); }

  // ── Circulars ──────────────────────────────
  getCirculars(): Observable<any[]>               { return this.http.get<any[]>(`${API}/admin/circulars`, { headers: this.headers() }); }
  addCircular(data: any): Observable<any>         { return this.http.post(`${API}/admin/circulars`, data, { headers: this.headers() }); }
  updateCircular(id: number, data: any): Observable<any> { return this.http.put(`${API}/admin/circulars/${id}`, data, { headers: this.headers() }); }
  deleteCircular(id: number): Observable<any>     { return this.http.delete(`${API}/admin/circulars/${id}`, { headers: this.headers() }); }

  // ── Departments ─────────────────────────────
  getDepartments(): Observable<any[]>                 { return this.http.get<any[]>(`${API}/admin/departments`, { headers: this.headers() }); }
  addDepartment(data: any): Observable<any>           { return this.http.post(`${API}/admin/departments`, data, { headers: this.headers() }); }
  updateDepartment(id: string, data: any): Observable<any> { return this.http.put(`${API}/admin/departments/${id}`, data, { headers: this.headers() }); }
  deleteDepartment(id: string): Observable<any>       { return this.http.delete(`${API}/admin/departments/${id}`, { headers: this.headers() }); }

  // ── Documents ──────────────────────────────
  getDocuments(category?: string): Observable<any[]> {
    const url = category ? `${API}/admin/documents?category=${category}` : `${API}/admin/documents`;
    return this.http.get<any[]>(url, { headers: this.headers() });
  }
  uploadDocument(file: File, category: string): Observable<any> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('category', category);
    return this.http.post(`${API}/admin/upload`, formData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` })
    });
  }
  deleteDocument(id: number): Observable<any> { return this.http.delete(`${API}/admin/documents/${id}`, { headers: this.headers() }); }

  // ── Settings ───────────────────────────────
  getSettings(): Observable<any>             { return this.http.get(`${API}/admin/settings`, { headers: this.headers() }); }
  updateSettings(data: any): Observable<any> { return this.http.put(`${API}/admin/settings`, data, { headers: this.headers() }); }
}
