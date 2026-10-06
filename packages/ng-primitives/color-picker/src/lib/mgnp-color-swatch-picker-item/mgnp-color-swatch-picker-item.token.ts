import { MgnpColorSwatchPickerItemVariants } from './mgnp-color-swatch-picker-item';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorSwatchPickerItemConfig {
  variant: MgnpColorSwatchPickerItemVariants['variant'];
}

const defaultConfig: MgnpColorSwatchPickerItemConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorSwatchPickerItemConfig>(
  'MgnpColorSwatchPickerItemConfig'
);

export function provideMgnpColorSwatchPickerItemConfig(
  config: Partial<MgnpColorSwatchPickerItemConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorSwatchPickerItemConfig(): MgnpColorSwatchPickerItemConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
