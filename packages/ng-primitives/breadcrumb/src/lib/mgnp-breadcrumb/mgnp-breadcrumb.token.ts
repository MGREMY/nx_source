import { MgnpBreadcrumbVariants } from './mgnp-breadcrumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbConfig {
  variant: MgnpBreadcrumbVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpBreadcrumbConfig>('MgnpBreadcrumbConfig');

export function provideMgnpBreadcrumbConfig(config: Partial<MgnpBreadcrumbConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpBreadcrumbConfig(): MgnpBreadcrumbConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
