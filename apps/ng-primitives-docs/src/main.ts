/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

fetch('/assets/config.json')
  .then((response) => response.json())
  .then((config) => ((window as any)['runtime_config'] = config))
  .catch(() => ((window as any)['runtime_config'] = {}))
  .finally(() => bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err)));
