import { InjectionToken } from '@angular/core';

export const APP_THEME_SERVICE = new InjectionToken<IAppThemeService>('APP_THEME_SERVICE');

export type AppTheme = 'light' | 'dark';

export interface IAppThemeService {
  getTheme(): AppTheme;
  setTheme(value: AppTheme): void;
}
