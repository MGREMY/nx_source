import { AUTH_SERVICE } from '@mgremy/core';
import { hasProperty } from '@mgremy/core/utils';

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);

  if (authService.isAuthenticated()) {
    return true;
  }

  authService.login();
  return false;
};

/**
 * Check if user is not connected
 *
 * @remarks
 * The returnPath has a default value of `['/']`
 *
 * @example
  {
    path: 'feat',
    loadChildren: () => import('./feat/feat.routes'),
    canActivate: [notAuthGuard],
    data: {
      notAuthGuard: {
        returnPath: ['/', 'some', 'path'],
      },
    },
  }
 */
export const notAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const authService = inject(AUTH_SERVICE);
  const guardData: unknown = route.data?.['notAuthGuard'];

  let returnPath: string[] = ['/'];

  if (hasProperty(guardData, 'returnPath')) {
    if (Array.isArray(guardData.returnPath)) returnPath = guardData.returnPath;
    else if (typeof guardData.returnPath === 'string') returnPath = guardData.returnPath.split('/');
  }

  if (authService.isAuthenticated()) {
    return router.createUrlTree(returnPath);
  }

  return true;
};
