import { MgnpBreadcrumbLinkVariants } from './mgnp-breadcrumb-link';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpBreadcrumbLinkConfig {
  variant: MgnpBreadcrumbLinkVariants['variant'];
}

const defaultConfig: MgnpBreadcrumbLinkConfig = {
  variant: 'default',
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
