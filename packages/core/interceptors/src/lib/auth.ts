import { AUTH_SERVICE } from '@mgremy/core';

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AUTH_SERVICE);

  if (authService.isAuthenticated()) {
    const clone = req.clone({
      withCredentials: true,
      headers: req.headers.append('Authorization', `Bearer ${authService.getAccessToken()}`),
    });

    return next(clone);
  }

  return next(req);
}
