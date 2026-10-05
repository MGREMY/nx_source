import { MgnpBreadcrumbVariants } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbItemConfig {
  variant?: MgnpBreadcrumbVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbItemConfig = {
  variant: undefined,
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
