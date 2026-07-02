import { EnvironmentProviders, InjectionToken, Provider } from '@angular/core';

export const ENVIRONMENT_VALUE = new InjectionToken<IEnvironment>('ENVIRONMENT_VALUE');

export interface IEnvironment {
  production: boolean;
  appUrl: string;
  appBaseHref: string;
  apiUrl: string;
  defaultLanguage: string;
  authUrl: string;
  authRealm: string;
  authClientId: string;
}

export function provideEnvironmentConfig(options: {
  value: IEnvironment;
}): (Provider | EnvironmentProviders)[] {
  return [{ provide: ENVIRONMENT_VALUE, useValue: options.value }];
}
