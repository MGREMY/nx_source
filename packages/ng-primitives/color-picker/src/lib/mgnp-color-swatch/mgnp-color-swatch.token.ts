import { MgnpColorSwatchVariants } from './mgnp-color-swatch';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorSwatchConfig {
  variant: MgnpColorSwatchVariants['variant'];
}

const defaultConfig: MgnpColorSwatchConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorSwatchConfig>('MgnpColorSwatchConfig');

export function provideMgnpColorSwatchConfig(
  config: Partial<MgnpColorSwatchConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorSwatchConfig(): MgnpColorSwatchConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
