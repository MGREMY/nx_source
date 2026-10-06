import { MgnpComboboxVariants } from './mgnp-combobox';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpComboboxConfig {
  variant: MgnpComboboxVariants['variant'];
}

const defaultConfig: MgnpComboboxConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpComboboxConfig>('MgnpComboboxConfig');

export function provideMgnpComboboxConfig(config: Partial<MgnpComboboxConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpComboboxConfig(): MgnpComboboxConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
