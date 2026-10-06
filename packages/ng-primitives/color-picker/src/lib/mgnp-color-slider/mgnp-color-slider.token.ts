import { MgnpColorSliderVariants } from './mgnp-color-slider';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorSliderConfig {
  variant: MgnpColorSliderVariants['variant'];
}

const defaultConfig: MgnpColorSliderConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorSliderConfig>('MgnpColorSliderConfig');

export function provideMgnpColorSliderConfig(
  config: Partial<MgnpColorSliderConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorSliderConfig(): MgnpColorSliderConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
