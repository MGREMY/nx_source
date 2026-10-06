import { MgnpColorSwatchPickerVariants } from './mgnp-color-swatch-picker';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorSwatchPickerConfig {
  variant: MgnpColorSwatchPickerVariants['variant'];
}

const defaultConfig: MgnpColorSwatchPickerConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorSwatchPickerConfig>('MgnpColorSwatchPickerConfig');

export function provideMgnpColorSwatchPickerConfig(
  config: Partial<MgnpColorSwatchPickerConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorSwatchPickerConfig(): MgnpColorSwatchPickerConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
