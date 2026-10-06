import { MgnpComboboxInputVariants } from './mgnp-combobox-input';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpComboboxInputConfig {
  variant: MgnpComboboxInputVariants['variant'];
}

const defaultConfig: MgnpComboboxInputConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpComboboxInputConfig>('MgnpComboboxInputConfig');

export function provideMgnpComboboxInputConfig(
  config: Partial<MgnpComboboxInputConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpComboboxInputConfig(): MgnpComboboxInputConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
