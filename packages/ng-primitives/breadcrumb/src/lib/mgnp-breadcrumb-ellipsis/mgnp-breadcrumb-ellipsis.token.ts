import { MgnpBreadcrumbVariants } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbEllipsisConfig {
  variant?: MgnpBreadcrumbVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbEllipsisConfig = {
  variant: undefined,
};

const Token = new InjectionToken<MgnpBreadcrumbEllipsisConfig>('MgnpBreadcrumbEllipsisConfig');

export function provideMgnpBreadcrumbEllipsisConfig(
  config: Partial<MgnpBreadcrumbEllipsisConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}
export function injectMgnpBreadcrumbEllipsisConfig(): MgnpBreadcrumbEllipsisConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
