import { STORAGE_SERVICE } from './storage';

import {
  afterNextRender,
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  Provider,
  Type,
} from '@angular/core';

export const THEME_SERVICE = new InjectionToken<IThemeService>('THEME_SERVICE');

export type Theme = 'light' | 'dark';

export interface IThemeService {
  getTheme(): Theme;
  setTheme(value: Theme): void;
}

@Injectable({ providedIn: 'root' })
export class ThemeService implements IThemeService {
  private readonly _storageService = inject(STORAGE_SERVICE);

  protected readonly _storageKeys = {
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

export function provideThemeConfig(options?: {
  service: Type<IThemeService>;
}): (Provider | EnvironmentProviders)[] {
  return [{ provide: THEME_SERVICE, useClass: options?.service ?? ThemeService }];
}
