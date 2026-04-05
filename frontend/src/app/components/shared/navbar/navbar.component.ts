import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  mobOpen   = false;
  mobGroup: string | null = null;
  isMobileViewport = false;
  isScrolled = false;
  isLoggedIn = false;
  userRole = 'user';
  username = '';
  currentUrl = '/';
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private auth: AdminAuthService) {}

  ngOnInit(): void {
    this.updateViewportState();
    this.syncUserSnapshot();
    this.currentUrl = this.router.url || '/';

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.currentUrl = (event as NavigationEnd).urlAfterRedirects || '/';
      });

    this.auth.isLoggedIn$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
        this.syncUserSnapshot();
      });

    this.auth.getUserRole$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        this.userRole = role || 'user';
        this.syncUserSnapshot();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled = window.scrollY > 60; }

  @HostListener('window:resize')
  onResize(): void { this.updateViewportState(); }

  go(path: string): void {
    this.router.navigate([path.startsWith('/') ? path : '/' + path]);
    this.closeMob();
  }

  isRouteActive(path: string, exact = false): boolean {
    const normalizedCurrent = this.normalizePath(this.currentUrl);
    const normalizedTarget = this.normalizePath(path);

    if (exact) {
      return normalizedCurrent === normalizedTarget;
    }

    return normalizedCurrent === normalizedTarget || normalizedCurrent.startsWith(`${normalizedTarget}/`);
  }

  isAnyRouteActive(paths: string[], exact = false): boolean {
    return paths.some((path) => this.isRouteActive(path, exact));
  }

  toggleMob(): void {
    if (!this.isMobileViewport) {
      this.closeMob();
      return;
    }

    this.mobOpen = !this.mobOpen;
    document.body.style.overflow = this.mobOpen ? 'hidden' : '';
  }

  closeMob(): void {
    this.mobOpen = false;
    this.mobGroup = null;
    document.body.style.overflow = '';
  }

  toggleMobGroup(g: string): void {
    this.mobGroup = this.mobGroup === g ? null : g;
  }

  logout(): void {
    this.auth.logout();
    this.closeMob();
  }

  get roleLabel(): string {
    if (!this.userRole) return 'User';
    return this.userRole.charAt(0).toUpperCase() + this.userRole.slice(1);
  }

  private syncUserSnapshot(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.userRole = this.auth.getUserRole();
    this.username = this.isLoggedIn ? this.auth.getUsername() : '';
  }

  private normalizePath(path: string): string {
    if (!path) return '/';
    const clean = path.split('?')[0].split('#')[0].trim();
    const withLeadingSlash = clean.startsWith('/') ? clean : `/${clean}`;
    return withLeadingSlash === '/' ? withLeadingSlash : withLeadingSlash.replace(/\/+$/, '');
  }

  private updateViewportState(): void {
    this.isMobileViewport = window.matchMedia('(max-width: 900px)').matches;

    // Prevent stale mobile drawer state when switching to desktop viewport/device mode.
    if (!this.isMobileViewport && this.mobOpen) {
      this.closeMob();
    }
  }
}
