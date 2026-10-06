import { MgnpComboboxButtonVariants } from './mgnp-combobox-button';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpComboboxButtonConfig {
  variant: MgnpComboboxButtonVariants['variant'];
}

const defaultConfig: MgnpComboboxButtonConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpComboboxButtonConfig>('MgnpComboboxButtonConfig');

export function provideMgnpComboboxButtonConfig(
  config: Partial<MgnpComboboxButtonConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpComboboxButtonConfig(): MgnpComboboxButtonConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
