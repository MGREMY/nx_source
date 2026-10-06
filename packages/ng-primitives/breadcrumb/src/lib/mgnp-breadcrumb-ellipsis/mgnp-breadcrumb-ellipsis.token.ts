import { MgnpBreadcrumbEllipsisVariants } from './mgnp-breadcrumb-ellipsis';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbEllipsisConfig {
  variant: MgnpBreadcrumbEllipsisVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbEllipsisConfig = {
  variant: 'default',
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
