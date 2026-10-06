import { MgnpComboboxDropdownVariants } from './mgnp-combobox-dropdown';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpComboboxDropdownConfig {
  variant: MgnpComboboxDropdownVariants['variant'];
}

const defaultConfig: MgnpComboboxDropdownConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpComboboxDropdownConfig>('MgnpComboboxDropdownConfig');

export function provideMgnpComboboxDroprownConfig(
  config: Partial<MgnpComboboxDropdownConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpComboboxDropdownConfig(): MgnpComboboxDropdownConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
