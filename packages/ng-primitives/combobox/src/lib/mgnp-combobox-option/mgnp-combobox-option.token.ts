import { MgnpComboboxOptionVariants } from './mgnp-combobox-option';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpComboboxOptionConfig {
  variant: MgnpComboboxOptionVariants['variant'];
}

const defaultConfig: MgnpComboboxOptionConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpComboboxOptionConfig>('MgnpComboboxOptionConfig');

export function provideMgnpComboboxOptionConfig(
  config: Partial<MgnpComboboxOptionConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpComboboxOptionConfig(): MgnpComboboxOptionConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
