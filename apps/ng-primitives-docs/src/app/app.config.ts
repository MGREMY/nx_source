import { environment } from '../environments/environment';
import { FileContent } from './components/file-content/file-content';
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
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  Injector,
  PLATFORM_ID,
  provideAppInitializer,
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
    provideAppInitializer(() => {
      const initializerFn = initializeCustomElements(inject(Injector), inject(PLATFORM_ID));
      return initializerFn();
    }),
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

export function initializeCustomElements(
  injector: Injector,
  platform: object
): () => Promise<void> {
  return async () => {
    if (isPlatformBrowser(platform)) {
      const { createCustomElement } = await import('@angular/elements');

      customElements.define(
        'app-file-content',
        createCustomElement(FileContent, { injector: injector })
      );
    }
  };
}
