import { MgnpColorFieldVariants } from './mgnp-color-field';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorFieldConfig {
  variant: MgnpColorFieldVariants['variant'];
}

const defaultConfig: MgnpColorFieldConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorFieldConfig>('MgnpColorFieldConfig');

export function provideMgnpColorFieldConfig(config: Partial<MgnpColorFieldConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorFieldConfig(): MgnpColorFieldConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
