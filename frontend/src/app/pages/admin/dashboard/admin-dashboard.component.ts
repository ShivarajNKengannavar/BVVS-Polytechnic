import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { AdminApiService } from '../../../services/admin-api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private readonly backendBaseUrl = environment.apiUrl.endsWith('/api')
    ? environment.apiUrl.replace(/\/api$/, '')
    : environment.apiUrl;

  activeTab = 'dashboard';
  adminUser = '';
  mobileSidebarOpen = false;

  stats = { notices: 0, circulars: 0, documents: 0, departments: 9 };
  notices:   any[] = [];
  circulars: any[] = [];
  documents: any[] = [];
  departments: any[] = [];
  settings:  any   = null;

  showAddNotice   = false;
  showAddCircular = false;
  showAddDepartment = false;
  newNotice   = { text: '', url: '' };
  newCircular = { title: '', description: '', url: '', date: '' };
  newDepartment = {
    id: '',
    name: '',
    shortName: '',
    icon: '🎓',
    duration: '3 Years',
    description: '',
    image: ''
  };

  editingNoticeIdx = -1;
  editNoticeData   = { text: '', url: '' };
  editingDepartmentId = '';
  editDepartmentData = {
    name: '',
    shortName: '',
    icon: '🎓',
    duration: '3 Years',
    description: '',
    image: ''
  };

  selectedFile:   File | null = null;
  noticeFile:     File | null = null;
  circularFile:   File | null = null;
  uploadCategory  = 'general';
  filterCategory  = '';
  uploading       = false;
  uploadProgress  = 0;
  uploadSuccess   = false;
  lastUploadUrl   = '';
  circularUploading = false;
  circularUploadProgress = 0;
  noticeUploading = false;
  noticeUploadProgress = 0;
  settingsSaved   = false;

  readonly categories = [
    { value: 'general',       label: 'General' },
    { value: 'circular',      label: 'Circular / Notice' },
    { value: 'syllabus',      label: 'Syllabus' },
    { value: 'result',        label: 'Result' },
    { value: 'accreditation', label: 'Accreditation' },
    { value: 'finance',       label: 'Finance / Audit' },
    { value: 'scholarship',   label: 'Scholarship' },
    { value: 'faculty',       label: 'Faculty Details' }
  ];

  constructor(
    private auth: AdminAuthService,
    private api:  AdminApiService
  ) {}

  ngOnInit(): void {
    this.adminUser = this.auth.getUsername();
    this.loadStats();
    this.loadNotices();
    this.loadCirculars();
    this.loadDepartments();
  }

  /* ── Navigation ─────────────────────── */
  setTab(tab: string): void {
    this.activeTab = tab;
    this.closeMobileSidebar();
    if (tab === 'documents') this.loadDocuments();
    if (tab === 'departments') this.loadDepartments();
    if (tab === 'settings')  this.loadSettings();
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900 && this.mobileSidebarOpen) {
      this.mobileSidebarOpen = false;
    }
  }

  /* ── Data loaders ───────────────────── */
  loadStats():     void { this.api.getStats().subscribe(s => this.stats = s); }
  loadNotices():   void { this.api.getNotices().subscribe(n => this.notices = n); }
  loadCirculars(): void { this.api.getCirculars().subscribe(c => this.circulars = c); }
  loadDepartments(): void { this.api.getDepartments().subscribe(d => this.departments = d); }
  loadSettings():  void { this.api.getSettings().subscribe(s => this.settings = s); }
  loadDocuments(): void {
    this.api.getDocuments(this.filterCategory || undefined)
      .subscribe(d => this.documents = d);
  }

  /* ── Notices ────────────────────────── */
  onNoticeFileSelect(event: any): void {
    this.noticeFile = event.target.files[0] || null;
  }

  uploadNoticeFile(): void {
    if (!this.noticeFile) return;
    this.noticeUploading = true;
    this.noticeUploadProgress = 0;

    const interval = setInterval(() => {
      if (this.noticeUploadProgress < 85) this.noticeUploadProgress += 15;
    }, 200);

    this.api.uploadDocument(this.noticeFile, 'notice').subscribe({
      next: (res: any) => {
        clearInterval(interval);
        this.noticeUploadProgress = 100;
        this.newNotice.url = res.document.url;
        this.noticeFile = null;
        this.noticeUploading = false;
        const fileInput = document.getElementById('noticeFileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: () => {
        clearInterval(interval);
        this.noticeUploading = false;
      }
    });
  }

  addNotice(): void {
    if (!this.newNotice.text) return;
    this.api.addNotice(this.newNotice).subscribe(() => {
      this.loadNotices();
      this.loadStats();
      this.newNotice     = { text: '', url: '' };
      this.showAddNotice = false;
    });
  }

  startEditNotice(i: number, n: any): void {
    this.editingNoticeIdx = i;
    this.editNoticeData   = { text: n.text, url: n.url || '' };
  }

  saveNotice(i: number): void {
    this.api.updateNotice(i, this.editNoticeData).subscribe(() => {
      this.loadNotices();
      this.editingNoticeIdx = -1;
    });
  }

  deleteNotice(i: number): void {
    if (!confirm('Delete this notice?')) return;
    this.api.deleteNotice(i).subscribe(() => {
      this.loadNotices();
      this.loadStats();
    });
  }

  /* ── Circulars ──────────────────────── */
  onCircularFileSelect(event: any): void {
    this.circularFile = event.target.files[0] || null;
  }

  uploadCircularFile(): void {
    if (!this.circularFile) return;
    this.circularUploading = true;
    this.circularUploadProgress = 0;

    const interval = setInterval(() => {
      if (this.circularUploadProgress < 85) this.circularUploadProgress += 15;
    }, 200);

    this.api.uploadDocument(this.circularFile, 'circular').subscribe({
      next: (res: any) => {
        clearInterval(interval);
        this.circularUploadProgress = 100;
        // Auto-populate URL in the form
        this.newCircular.url = res.document.url;
        this.circularFile = null;
        this.circularUploading = false;
        // Reset file input
        const fileInput = document.getElementById('circularFileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: () => {
        clearInterval(interval);
        this.circularUploading = false;
      }
    });
  }

  addCircular(): void {
    if (!this.newCircular.title || !this.newCircular.url) return;
    this.api.addCircular(this.newCircular).subscribe(() => {
      this.loadCirculars();
      this.loadStats();
      this.newCircular     = { title: '', description: '', url: '', date: '' };
      this.showAddCircular = false;
    });
  }

  deleteCircular(id: number): void {
    if (!confirm('Delete this circular?')) return;
    this.api.deleteCircular(id).subscribe(() => {
      this.loadCirculars();
      this.loadStats();
    });
  }

  /* ── Departments ────────────────────── */
  addDepartment(): void {
    if (!this.newDepartment.name) return;

    const payload = {
      ...this.newDepartment,
      fullDescription: this.newDepartment.description
    };

    this.api.addDepartment(payload).subscribe(() => {
      this.loadDepartments();
      this.loadStats();
      this.newDepartment = {
        id: '',
        name: '',
        shortName: '',
        icon: '🎓',
        duration: '3 Years',
        description: '',
        image: ''
      };
      this.showAddDepartment = false;
    });
  }

  startEditDepartment(d: any): void {
    this.editingDepartmentId = d.id;
    this.editDepartmentData = {
      name: d.name || '',
      shortName: d.shortName || '',
      icon: d.icon || '🎓',
      duration: d.duration || '3 Years',
      description: d.description || '',
      image: d.image || ''
    };
  }

  saveDepartment(): void {
    if (!this.editingDepartmentId || !this.editDepartmentData.name) return;

    const payload = {
      ...this.editDepartmentData,
      fullDescription: this.editDepartmentData.description
    };

    this.api.updateDepartment(this.editingDepartmentId, payload).subscribe(() => {
      this.loadDepartments();
      this.editingDepartmentId = '';
    });
  }

  deleteDepartment(id: string): void {
    if (!confirm('Delete this department?')) return;
    this.api.deleteDepartment(id).subscribe(() => {
      this.loadDepartments();
      this.loadStats();
    });
  }

  /* ── Documents ──────────────────────── */
  onFileSelect(event: any): void {
    this.selectedFile  = event.target.files[0] || null;
    this.uploadSuccess = false;
  }

  uploadDocument(): void {
    if (!this.selectedFile) return;
    this.uploading     = true;
    this.uploadProgress = 0;
    this.uploadSuccess  = false;

    const interval = setInterval(() => {
      if (this.uploadProgress < 85) this.uploadProgress += 15;
    }, 200);

    this.api.uploadDocument(this.selectedFile, this.uploadCategory).subscribe({
      next: (res: any) => {
        clearInterval(interval);
        this.uploadProgress = 100;
        setTimeout(() => {
          this.uploading      = false;
          this.uploadSuccess  = true;
          this.lastUploadUrl  = this.getFullUrl(res.document.url);
          this.selectedFile   = null;
          this.loadDocuments();
          this.loadStats();
        }, 400);
      },
      error: () => {
        clearInterval(interval);
        this.uploading = false;
      }
    });
  }

  deleteDocument(id: number): void {
    if (!confirm('Delete this document?')) return;
    this.api.deleteDocument(id).subscribe(() => {
      this.loadDocuments();
      this.loadStats();
    });
  }

  /* ── Settings ───────────────────────── */
  saveSettings(): void {
    this.api.updateSettings(this.settings).subscribe(() => {
      this.settingsSaved = true;
      setTimeout(() => this.settingsSaved = false, 3000);
    });
  }

  /* ── Helpers ────────────────────────── */
  getFullUrl(url: string): string {
    return url.startsWith('http') ? url : `${this.backendBaseUrl}${url}`;
  }

  copyUrl(url: string): void {
    navigator.clipboard.writeText(url).then(() => alert('URL copied to clipboard!'));
  }

  logout(): void {
    this.closeMobileSidebar();
    this.auth.logout();
  }
}
