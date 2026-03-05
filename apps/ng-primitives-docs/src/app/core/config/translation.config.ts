import { NgxTranslationService } from '../services/ngx-translation.service';
import { APP_TRANSLATION_SERVICE } from '@mgremy/core';

import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { registerLocaleData } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import localeUS from '@angular/common/locales/en';
import localeFR from '@angular/common/locales/fr';
import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  Provider,
} from '@angular/core';

export function provideTranslationConfig(): (
  | Provider
  | EnvironmentProviders
)[] {
  registerLocaleData(localeFR);
  registerLocaleData(localeUS);

  return [
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: (handler: HttpBackend) =>
          new TranslateHttpLoader(new HttpClient(handler), './i18n/', '.json'),
        deps: [HttpBackend],
      },
    }),
    { provide: APP_TRANSLATION_SERVICE, useClass: NgxTranslationService },
    provideAppInitializer(() => inject(APP_TRANSLATION_SERVICE).init()),
  ];
}
