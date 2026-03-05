import { APP_ENVIRONMENT_SERVICE, IAppConfigService } from '@mgremy/core';

import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService implements IAppConfigService {
  private readonly _environment = inject(APP_ENVIRONMENT_SERVICE);
  private readonly _windowKey = 'runtime_config';

  private isValidValue(value: string | undefined): boolean {
    // If starts with ${, it's the placeholder used by the build system
    return value !== undefined && value !== '' && !value.startsWith('${');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getValue(key: string): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any)[this._windowKey][key];
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
