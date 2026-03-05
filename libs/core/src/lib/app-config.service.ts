import { InjectionToken } from '@angular/core';

export const APP_CONFIG_SERVICE = new InjectionToken<IAppConfigService>('APP_CONFIG_SERVICE');

export interface IAppConfigService {
  get appUrl(): string;
  get appBaseHref(): string;
  get apiUrl(): string;
  get defaultLanguage(): string;
  get authUrl(): string;
  get authRealm(): string;
  get authClientId(): string;
}
