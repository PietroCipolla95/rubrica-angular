import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router);

  console.log('allowTo', route.data['allowTo']);
  console.log('permessi utente', authService.permissions);

  const hasPerms = route.data['allowTo'].some((allowed: [string]) => allowed.every((perm: string) => authService.permissions.includes(perm)));

  if (!hasPerms) {

    router.navigate([''])

    return true
  }

  return hasPerms;
};
