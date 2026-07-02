import { CONFIG_SERVICE } from './app-config';
import { STORAGE_SERVICE } from './storage';

import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeUS from '@angular/common/locales/en';
import localeFR from '@angular/common/locales/fr';
import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  provideAppInitializer,
  Provider,
  signal,
  Signal,
  Type,
} from '@angular/core';

export const TRANSLATION_SERVICE = new InjectionToken<ITranslationService>('TRANSLATION_SERVICE');

export interface ITranslationService {
  currentLanguage: Signal<string>;

  init(): void;
  setLanguage(code: string): void;

  instant(key: string, params?: Record<string, string>): string;
  instant(key: string[], params?: Record<string, string>): string[];
  instant(key: string | string[], params?: Record<string, string>): string | string[];
}

@Injectable({ providedIn: 'root' })
export class TranslationService implements ITranslationService {
  private readonly _storageService = inject(STORAGE_SERVICE);
  private readonly _appConfigService = inject(CONFIG_SERVICE);
  private readonly _translationService = inject(TranslateService);

  protected readonly _storageKeys = {
    lang: 'translation.lang',
  };

  protected readonly _currentLanguage = signal(
    this._storageService.getItem(this._storageKeys.lang) ?? this._appConfigService.defaultLanguage
  );
  public readonly currentLanguage = this._currentLanguage.asReadonly();

  public init(): void {
    this._translationService.use(this._currentLanguage());
    this._storageService.setItem(this._storageKeys.lang, this._currentLanguage());
  }

  public setLanguage(code: string): void {
    this._storageService.setItem(this._storageKeys.lang, code);
    this._currentLanguage.set(code);
    this._translationService.use(code);
  }

  public instant(key: string, params?: Record<string, string>): string;
  public instant(key: string[], params?: Record<string, string>): string[];
  public instant(key: string | string[], params?: Record<string, string>): string | string[] {
    return this._translationService.instant(key, params);
  }
}

export function provideTranslationConfig(options?: {
  service?: Type<ITranslationService>;
}): (Provider | EnvironmentProviders)[] {
  registerLocaleData(localeFR);
  registerLocaleData(localeUS);

  return [
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n', suffix: '.json' }),
    }),
    { provide: TRANSLATION_SERVICE, useClass: options?.service ?? TranslationService },
    provideAppInitializer(() => inject(TRANSLATION_SERVICE).init()),
  ];
}
