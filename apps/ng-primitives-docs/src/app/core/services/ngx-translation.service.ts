import { APP_CONFIG_SERVICE, APP_STORAGE_SERVICE, ITranslationService } from '@mgremy/core';

import { TranslateService } from '@ngx-translate/core';

import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgxTranslationService implements ITranslationService {
  private readonly _storageService = inject(APP_STORAGE_SERVICE);
  private readonly _appConfigService = inject(APP_CONFIG_SERVICE);
  private readonly _translationService = inject(TranslateService);

  private readonly _storageKeys = {
    lang: 'translation.lang',
  };

  private readonly _currentLanguage = signal(
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
}
