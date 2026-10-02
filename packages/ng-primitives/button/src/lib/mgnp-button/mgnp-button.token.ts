import { ButtonVariants } from './mgnp-button';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpButtonConfig {
  variant: ButtonVariants['variant'];
  size: ButtonVariants['size'];
}

const defaultConfig: MgnpButtonConfig = {
  variant: 'default',
  size: 'md',
};

const MgnpButtonConfigToken = new InjectionToken<MgnpButtonConfig>('MgnpButtonConfig');

export function provideMgnpButtonConfig(config: Partial<MgnpButtonConfig>): ValueProvider {
  return { provide: MgnpButtonConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpButtonConfig(): MgnpButtonConfig {
  return inject(MgnpButtonConfigToken, { optional: true }) ?? defaultConfig;
}
