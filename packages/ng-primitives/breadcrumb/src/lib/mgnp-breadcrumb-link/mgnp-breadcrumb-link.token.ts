import { MgnpBreadcrumbVariants } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbLinkConfig {
  variant?: MgnpBreadcrumbVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbLinkConfig = {
  variant: undefined,
};

const Token = new InjectionToken<MgnpBreadcrumbLinkConfig>('MgnpBreadcrumbLinkConfig');

export function provideMgnpBreadcrumbLinkConfig(
  config: Partial<MgnpBreadcrumbLinkConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}
export function injectMgnpBreadcrumbLinkConfig(): MgnpBreadcrumbLinkConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
