import { MgnpBreadcrumbVariants } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbSeparatorConfig {
  variant?: MgnpBreadcrumbVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbSeparatorConfig = {
  variant: undefined,
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
