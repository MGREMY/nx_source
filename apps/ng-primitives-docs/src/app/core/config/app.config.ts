import { AppConfigService } from '../services/app-config.service';
import { CONFIG_SERVICE } from '@mgremy/core';

import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { inject, Provider } from '@angular/core';

export function provideApplicationConfig(): Provider[] {
  return [
    { provide: CONFIG_SERVICE, useClass: AppConfigService },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: APP_BASE_HREF,
      useFactory: () => inject(CONFIG_SERVICE).appBaseHref,
    },
  ];
}
