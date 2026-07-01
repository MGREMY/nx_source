import { ENVIRONMENT_VALUE } from './environment';

import { APP_BASE_HREF } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  Provider,
  Type,
} from '@angular/core';

export const CONFIG_SERVICE = new InjectionToken<IConfigService>('CONFIG_SERVICE');

export interface IConfigService {
  get appUrl(): string;
  get appBaseHref(): string;
  get apiUrl(): string;
  get defaultLanguage(): string;
  get authUrl(): string;
  get authRealm(): string;
  get authClientId(): string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService implements IConfigService {
  private readonly _environment = inject(ENVIRONMENT_VALUE);
  private readonly _windowKey = 'runtime_config';

  private isValidValue(value: string | undefined | null): boolean {
    // If starts with ${, it's the placeholder used by the build system
    return value !== undefined && value !== null && value !== '' && !value.startsWith('${');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getValue(key: string): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any)[this._windowKey]?.[key];
  }

  get appUrl(): string {
    const value = this.getValue('APP_URL');

    return this.isValidValue(value) ? value : this._environment.appUrl;
  }

  get appBaseHref(): string {
    const value = this.getValue('APP_BASE_HREF');

    return this.isValidValue(value) ? value : this._environment.appBaseHref;
  }

  get apiUrl(): string {
    const value = this.getValue('API_URL');

    return this.isValidValue(value) ? value : this._environment.apiUrl;
  }

  get defaultLanguage(): string {
    const value = this.getValue('DEFAULT_LANGUAGE');

    return this.isValidValue(value) ? value : this._environment.defaultLanguage;
  }

  get authUrl(): string {
    const value = this.getValue('AUTH_URL');

    return this.isValidValue(value) ? value : this._environment.authUrl;
  }

  get authRealm(): string {
    const value = this.getValue('AUTH_REALM');

    return this.isValidValue(value) ? value : this._environment.authRealm;
  }

  get authClientId(): string {
    const value = this.getValue('AUTH_CLIENT_ID');

    return this.isValidValue(value) ? value : this._environment.authClientId;
  }
}

export function provideConfig(options?: {
  service?: Type<IConfigService>;
}): (Provider | EnvironmentProviders)[] {
  return [
    { provide: CONFIG_SERVICE, useClass: options?.service ?? ConfigService },
    { provide: APP_BASE_HREF, useFactory: () => inject(CONFIG_SERVICE).appBaseHref },
  ];
}
