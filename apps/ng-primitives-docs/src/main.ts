import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

fetch('./assets/config.json')
  .then((response) => response.json())
  .then((config) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)['runtime_config'] = config;
    bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
  });
