import { AUTH_SERVICE } from '@mgremy/core';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);

  if (authService.isAuthenticated()) {
    return true;
  }

  authService.login();
  return false;
};

export const notAuthGuard: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/', 'app']);
  }

  return true;
};
