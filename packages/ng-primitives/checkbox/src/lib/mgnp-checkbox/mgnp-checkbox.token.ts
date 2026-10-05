import { MgnpCheckboxVariants } from './mgnp-checkbox';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpCheckboxConfig {
  variant: MgnpCheckboxVariants['variant'];
  size: MgnpCheckboxVariants['size'];
}

const defaultConfig: MgnpCheckboxConfig = {
  variant: 'default',
  size: 'md',
};

const Token = new InjectionToken<MgnpCheckboxConfig>('MgnpCheckboxConfig');

export function provideMgnpCheckboxConfig(config: Partial<MgnpCheckboxConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpCheckboxConfig(): MgnpCheckboxConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
