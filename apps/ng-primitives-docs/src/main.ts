import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

fetch('/assets/config.json')
  .then((response) => response.json())
  .then((config) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)['runtime_config'] = config;
    bootstrapApplication(App, appConfig).catch((err) => console.error(err));
  });
