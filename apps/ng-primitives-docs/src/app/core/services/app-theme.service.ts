import { STORAGE_SERVICE, Theme, IThemeService } from '@mgremy/core';

import { afterNextRender, inject } from '@angular/core';

export class AppThemeService implements IThemeService {
  private readonly _storageService = inject(STORAGE_SERVICE);
  private readonly _storageKeys = {
    theme: 'theme.current',
  };

  constructor() {
    afterNextRender(() => {
      this.setTheme(this.getTheme());
    });
  }

  getTheme(): Theme {
    const storageValue = this._storageService.getItem(this._storageKeys.theme);

    if (storageValue === undefined || (storageValue !== 'light' && storageValue !== 'dark')) {
      return 'light';
    }

    return storageValue;
  }

  setTheme(key: Theme): void {
    this._storageService.setItem(this._storageKeys.theme, key);

    if (key === 'light') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
  }
}
