import { MgnpBreadcrumbSeparatorVariants } from './mgnp-breadcrumb-separator';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbSeparatorConfig {
  variant: MgnpBreadcrumbSeparatorVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbSeparatorConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpBreadcrumbSeparatorConfig>('MgnpBreadcrumbSeparatorConfig');

export function provideMgnpBreadcrumbSeparatorConfig(
  config: Partial<MgnpBreadcrumbSeparatorConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}
export function injectMgnpBreadcrumbSeparatorConfig(): MgnpBreadcrumbSeparatorConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
