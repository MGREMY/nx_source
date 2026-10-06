import { MgnpColorPickerVariants } from './mgnp-color-picker';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorPickerConfig {
  variant: MgnpColorPickerVariants['variant'];
}

const defaultConfig: MgnpColorPickerConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorPickerConfig>('MgnpColorPickerConfig');

export function provideMgnpColorPickerConfig(
  config: Partial<MgnpColorPickerConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorPickerConfig(): MgnpColorPickerConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
