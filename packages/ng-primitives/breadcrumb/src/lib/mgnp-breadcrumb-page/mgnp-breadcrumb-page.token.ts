import { MgnpBreadcrumbVariants } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbPageConfig {
  variant?: MgnpBreadcrumbVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbPageConfig = {
  variant: undefined,
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
