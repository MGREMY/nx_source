import { APP_STORAGE_SERVICE, AppTheme, IAppThemeService } from '@mgremy/core';

import { afterNextRender, inject } from '@angular/core';

export class AppThemeService implements IAppThemeService {
  private readonly _storageService = inject(APP_STORAGE_SERVICE);
  private readonly _storageKeys = {
    theme: 'theme.current',
  };

  constructor() {
    afterNextRender(() => {
      this.setTheme(this.getTheme());
    });
  }

  getTheme(): AppTheme {
    const storageValue = this._storageService.getItem(this._storageKeys.theme);

    if (storageValue === undefined || (storageValue !== 'light' && storageValue !== 'dark')) {
      return 'light';
    }

    return storageValue;
  }

  setTheme(key: AppTheme): void {
    this._storageService.setItem(this._storageKeys.theme, key);

    if (key === 'light') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
  }
}
