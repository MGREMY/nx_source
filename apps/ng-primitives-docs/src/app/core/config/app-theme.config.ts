import { AppThemeService } from '../services/app-theme.service';
import { THEME_SERVICE } from '@mgremy/core';

import { Provider } from '@angular/core';

export function provideApplicationThemeConfig(): Provider {
  return { provide: THEME_SERVICE, useClass: AppThemeService };
}
