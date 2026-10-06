import { MgnpColorSliderThumbVariants } from './mgnp-color-slider-thumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorSliderThumbConfig {
  variant: MgnpColorSliderThumbVariants['variant'];
}

const defaultConfig: MgnpColorSliderThumbConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorSliderThumbConfig>('MgnpColorSliderThumbConfig');

export function provideMgnpColorSliderThumbConfig(
  config: Partial<MgnpColorSliderThumbConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorSliderThumbConfig(): MgnpColorSliderThumbConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
