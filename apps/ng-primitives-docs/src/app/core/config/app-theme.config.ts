import { AppThemeService } from '../services/app-theme.service';
import { APP_THEME_SERVICE } from '@mgremy/core';

import { Provider } from '@angular/core';

export function provideApplicationThemeConfig(): Provider {
  return { provide: APP_THEME_SERVICE, useClass: AppThemeService };
}
