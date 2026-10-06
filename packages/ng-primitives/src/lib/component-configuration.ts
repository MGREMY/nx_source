import { inject, InjectionToken, ValueProvider } from '@angular/core';

export function createMgnpComponentConfig<T>(
  name: string,
  defaultConfig: T
): [(config: Partial<T>) => ValueProvider, () => T] {
  const token = new InjectionToken<T>(name);

  const provideConfig: (config: Partial<T>) => ValueProvider = (config) => {
    return { provide: token, useValue: { ...defaultConfig, ...config } };
  };

  const injectConfig: () => T = () => {
    return inject(token, { optional: true }) ?? defaultConfig;
  };

  return [provideConfig, injectConfig];
}
