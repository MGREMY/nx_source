import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_BASE_HREF,
      useFactory: () => environment.appBaseHref,
    },
  ],
};
