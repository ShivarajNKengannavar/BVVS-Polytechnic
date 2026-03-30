import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // ── Public pages ──────────────────────────────────────────────
  { path: '',               loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about',          loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'admission',      loadComponent: () => import('./pages/admission/admission.component').then(m => m.AdmissionComponent) },
  { path: 'academics',      loadComponent: () => import('./pages/academics/academics.component').then(m => m.AcademicsComponent) },
  { path: 'academics/:id',  loadComponent: () => import('./pages/academics/department-detail/department-detail.component').then(m => m.DepartmentDetailComponent) },
  { path: 'placement',      loadComponent: () => import('./pages/placement/placement.component').then(m => m.PlacementComponent) },
  { path: 'facilities',     loadComponent: () => import('./pages/facilities/facilities.component').then(m => m.FacilitiesComponent) },
  { path: 'examinations',   loadComponent: () => import('./pages/examinations/examinations.component').then(m => m.ExaminationsComponent) },
  { path: 'library',        loadComponent: () => import('./pages/library/library.component').then(m => m.LibraryComponent) },
  { path: 'community',      loadComponent: () => import('./pages/community/community.component').then(m => m.CommunityComponent) },
  { path: 'entrepreneurship', loadComponent: () => import('./pages/entrepreneurship/entrepreneurship.component').then(m => m.EntrepreneurshipComponent) },
  { path: 'accreditation',  loadComponent: () => import('./pages/accreditation/accreditation.component').then(m => m.AccreditationComponent) },
  { path: 'student-life',   loadComponent: () => import('./pages/student-life/student-life.component').then(m => m.StudentLifeComponent) },
  { path: 'circulars',      loadComponent: () => import('./pages/circulars/circulars.component').then(m => m.CircularsComponent) },
  { path: 'gallery',        loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'downloads',      loadComponent: () => import('./pages/downloads/downloads.component').then(m => m.DownloadsComponent) },
  { path: 'administration', loadComponent: () => import('./pages/administration/administration.component').then(m => m.AdministrationComponent) },

  // ── Unified login + admin pages ───────────────────────────────
  { path: 'login',          loadComponent: () => import('./pages/admin/login/admin-login.component').then(m => m.AdminLoginComponent) },
  { path: 'admin/login',    redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin/dashboard', canActivate: [adminGuard], loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'admin',          redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: '' }
];
