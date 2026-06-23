import { InjectionToken, Signal } from '@angular/core';

export const APP_TRANSLATION_SERVICE = new InjectionToken<ITranslationService>(
  'APP_TRANSLATION_SERVICE'
);

export interface ITranslationService {
  currentLanguage: Signal<string>;

  init(): void;
  setLanguage(code: string): void;

  instant(key: string, params?: Record<string, string>): string;
  instant(key: string[], params?: Record<string, string>): string[];
  instant(key: string | string[], params?: Record<string, string>): string | string[];
}
