import { environment } from '../environments/environment';
import { AppExample } from './components/example';
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
    provideNgIconsConfig({
      size: '16px',
    }),
    provideAppInitializer(() => {
      const initializerFn = initializeCustomElements(inject(Injector), inject(PLATFORM_ID));
      return initializerFn();
    }),
    provideEnvironmentConfig({ value: environment }),
    provideConfig(),
    provideStorageConfig(),
    provideThemeConfig(),
  ],
};

export function initializeCustomElements(
  injector: Injector,
  platform: object
): () => Promise<void> {
  return async () => {
    if (isPlatformBrowser(platform)) {
      const { createCustomElement } = await import('@angular/elements');

      customElements.define('app-example', createCustomElement(AppExample, { injector: injector }));
    }
  };
}
