import { AppTheme, IAppThemeService } from '@mgremy/core';

export class AppThemeService implements IAppThemeService {
  getTheme(): AppTheme {
    return 'light';
  }

  setTheme(key: AppTheme): void {
    return void 0;
  }
}
