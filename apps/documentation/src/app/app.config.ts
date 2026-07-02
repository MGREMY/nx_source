import { environment } from '../environments/environment';
import {
  provideConfig,
  provideEnvironmentConfig,
  provideStorageConfig,
  provideThemeConfig,
} from '@mgremy/core';
import { langInterceptor } from '@mgremy/core/interceptors';

import { provideNgIconsConfig } from '@ng-icons/core';

import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withShikiHighlighter } from '@analogjs/content/shiki-highlighter';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
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
    provideFileRouter(withComponentInputBinding()),
    provideContent(withMarkdownRenderer(), withShikiHighlighter()),
    provideNgIconsConfig({
      size: '16px',
    }),
    provideEnvironmentConfig({ value: environment }),
    provideConfig(),
    provideStorageConfig(),
    provideThemeConfig(),
  ],
};
