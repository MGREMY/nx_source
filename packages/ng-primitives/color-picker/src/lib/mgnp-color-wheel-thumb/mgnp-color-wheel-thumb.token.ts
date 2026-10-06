import { MgnpColorWheelThumbVariants } from './mgnp-color-wheel-thumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorWheelThumbConfig {
  variant: MgnpColorWheelThumbVariants['variant'];
}

const defaultConfig: MgnpColorWheelThumbConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorWheelThumbConfig>('MgnpColorWheelThumbConfig');

export function provideMgnpColorWheelThumbConfig(
  config: Partial<MgnpColorWheelThumbConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorWheelThumbConfig(): MgnpColorWheelThumbConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
