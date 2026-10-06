import { MgnpBreadcrumbPageVariants } from './mgnp-breadcrumb-page';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbPageConfig {
  variant: MgnpBreadcrumbPageVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbPageConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpBreadcrumbPageConfig>('MgnpBreadcrumbPageConfig');

export function provideMgnpBreadcrumbPageConfig(
  config: Partial<MgnpBreadcrumbPageConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}
export function injectMgnpBreadcrumbPageConfig(): MgnpBreadcrumbPageConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
