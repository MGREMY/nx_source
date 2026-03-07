import { environment } from '../environments/environment';
import { provideApplicationThemeConfig } from './core/config/app-theme.config';
import { provideApplicationConfig } from './core/config/app.config';
import { provideDefaultDatePipeConfig } from './core/config/pipe.config';
import { provideStorageConfig } from './core/config/storage.config';
import { provideTranslationConfig } from './core/config/translation.config';
import { langInterceptor } from './core/interceptors/lang.interceptor';
import { APP_ENVIRONMENT_SERVICE } from '@mgremy/core';

import { provideNgIconsConfig } from '@ng-icons/core';

import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withShikiHighlighter } from '@analogjs/content/shiki-highlighter';
import { provideFileRouter, requestContextInterceptor, withDebugRoutes } from '@analogjs/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([langInterceptor, requestContextInterceptor])),
    provideFileRouter(withComponentInputBinding(), withDebugRoutes()),
    provideContent(withMarkdownRenderer(), withShikiHighlighter()),
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
