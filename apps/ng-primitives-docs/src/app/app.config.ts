import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { provideApplicationThemeConfig } from './core/config/app-theme.config';
import { provideApplicationConfig } from './core/config/app.config';
import { provideDefaultDatePipeConfig } from './core/config/pipe.config';
import { provideStorageConfig } from './core/config/storage.config';
import { provideTranslationConfig } from './core/config/translation.config';
import { langInterceptor } from './core/interceptors/lang.interceptor';
import { APP_ENVIRONMENT_SERVICE } from '@mgremy/core';

import { provideNgIconsConfig } from '@ng-icons/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([langInterceptor])),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideNgIconsConfig({
      size: '16px',
    }),
    {
      provide: APP_ENVIRONMENT_SERVICE,
      useValue: environment,
    },
    provideApplicationThemeConfig(),
    provideDefaultDatePipeConfig(),
    provideApplicationConfig(),
    provideStorageConfig(),
    provideTranslationConfig(), // Internationalization
  ],
};
