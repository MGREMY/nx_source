import { MgnpButtonVariants } from './mgnp-button';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpButtonConfig {
  variant: MgnpButtonVariants['variant'];
  size: MgnpButtonVariants['size'];
}

const defaultConfig: MgnpButtonConfig = {
  variant: 'default',
  size: 'md',
};

const Token = new InjectionToken<MgnpButtonConfig>('MgnpButtonConfig');

export function provideMgnpButtonConfig(config: Partial<MgnpButtonConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpButtonConfig(): MgnpButtonConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
