import { CONFIG_SERVICE, TRANSLATION_SERVICE } from '@mgremy/core';

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function langInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const translationService = inject(TRANSLATION_SERVICE);
  const configService = inject(CONFIG_SERVICE);

  if (req.url.startsWith(configService.apiUrl)) {
    const clone = req.clone({
      headers: req.headers.append('Accept-Language', translationService.currentLanguage()),
    });

    return next(clone);
  }

  return next(req);
}
