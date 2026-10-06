import { MgnpColorSliderTrackVariants } from './mgnp-color-slider-track';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorSliderTrackConfig {
  variant: MgnpColorSliderTrackVariants['variant'];
}

const defaultConfig: MgnpColorSliderTrackConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorSliderTrackConfig>('MgnpColorSliderTrackConfig');

export function provideMgnpColorSliderTrackConfig(
  config: Partial<MgnpColorSliderTrackConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorSliderTrackConfig(): MgnpColorSliderTrackConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
