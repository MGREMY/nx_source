import { MgnpColorPickerVariants } from '../mgnp-color-picker/mgnp-color-picker';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorAreaConfig {
  variant: MgnpColorPickerVariants['variant'];
}

const defaultConfig: MgnpColorAreaConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorAreaConfig>('MgnpColorAreaConfig');

export function provideMgnpColorAreaConfig(config: Partial<MgnpColorAreaConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorAreaConfig(): MgnpColorAreaConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
