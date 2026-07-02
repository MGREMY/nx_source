import { AUTH_SERVICE } from '@mgremy/core';

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

/**
 * Check if connected user has role
 *
 * @remarks
 * This guards waits for `hasRoleGuard.roles` as data from angular route (as shown in the example)
 * The behavior can be changed between `any` and `all`
 *
 * `any` checks if the user has at least one role provided
 *
 * `all` checks if the user has every role provided
 *
 * @example
  {
    path: 'feat',
    loadChildren: () => import('./feat/feat.routes'),
    canActivate: [hasRoleGuard],
    data: {
      hasRoleGuard: {
        mode: 'any',
        roles: [roles.Admin],
      },
    },
  },
 */
export const hasRoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AUTH_SERVICE);
  const guardData = route.data['hasRoleGuard'];

  if (guardData?.roles === undefined || !Array.isArray(guardData.roles)) {
    throw new Error('Role must be passed as an array');
  }

  const roles: string[] = guardData.roles;
  const mode: 'all' | 'any' = guardData.mode ?? 'any';

  if (authService.isAuthenticated()) {
    const accessToken = authService.getDecodedAccessToken();

    if (accessToken !== undefined) {
      const accessTokenRoles = accessToken.roles;

      if (accessTokenRoles != undefined) {
        const matchedRoles = accessTokenRoles.filter((x) => roles.includes(x));

        switch (mode) {
          case 'all':
            return matchedRoles.length === roles.length;
          case 'any':
            return matchedRoles.length > 0;
        }
      }
    }
  }

  return false;
};
