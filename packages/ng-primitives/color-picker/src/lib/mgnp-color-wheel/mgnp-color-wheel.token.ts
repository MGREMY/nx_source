import { MgnpColorWheelVariants } from './mgnp-color-wheel';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorWheelConfig {
  variant: MgnpColorWheelVariants['variant'];
}

const defaultConfig: MgnpColorWheelConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorWheelConfig>('MgnpColorWheelConfig');

export function provideMgnpColorWheelConfig(config: Partial<MgnpColorWheelConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorWheelConfig(): MgnpColorWheelConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
