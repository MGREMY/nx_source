import { MgnpBreadcrumbListVariants } from './mgnp-breadcrumb-list';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbListConfig {
  variant: MgnpBreadcrumbListVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbListConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpBreadcrumbListConfig>('MgnpBreadcrumbListConfig');

export function provideMgnpBreadcrumbListConfig(
  config: Partial<MgnpBreadcrumbListConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}
export function injectMgnpBreadcrumbListConfig(): MgnpBreadcrumbListConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
