import { LocalStorageService } from '../services/local-storage.service';
import { STORAGE_SERVICE } from '@mgremy/core';

import { Provider } from '@angular/core';

export function provideStorageConfig(): Provider {
  return { provide: STORAGE_SERVICE, useClass: LocalStorageService };
}
