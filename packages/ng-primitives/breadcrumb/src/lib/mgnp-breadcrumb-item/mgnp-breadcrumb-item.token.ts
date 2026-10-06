import { MgnpBreadcrumbItemVariants } from './mgnp-breadcrumb-item';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbItemConfig {
  variant: MgnpBreadcrumbItemVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbItemConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpBreadcrumbItemConfig>('MgnpBreadcrumbItemConfig');

export function provideMgnpBreadcrumbItemConfig(
  config: Partial<MgnpBreadcrumbItemConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}
export function injectMgnpBreadcrumbItemConfig(): MgnpBreadcrumbItemConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
