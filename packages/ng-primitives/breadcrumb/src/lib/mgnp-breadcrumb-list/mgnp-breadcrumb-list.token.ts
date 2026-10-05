import { MgnpBreadcrumbVariants } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbListConfig {
  variant?: MgnpBreadcrumbVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbListConfig = {
  variant: undefined,
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
