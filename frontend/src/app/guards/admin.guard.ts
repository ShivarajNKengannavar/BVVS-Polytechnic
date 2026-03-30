import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  const isLoggedIn = auth.isLoggedIn();
  if (isLoggedIn && auth.hasRole('admin')) return true;
  router.navigate(['/login']);
  return false;
};
