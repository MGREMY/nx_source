import { MgnpColorAreaThumbVariants } from './mgnp-color-area-thumb';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpColorAreaThumbConfig {
  variant: MgnpColorAreaThumbVariants['variant'];
}

const defaultConfig: MgnpColorAreaThumbConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpColorAreaThumbConfig>('MgnpColorAreaThumbConfig');

export function provideMgnpColorAreaThumbConfig(
  config: Partial<MgnpColorAreaThumbConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpColorAreaThumbConfig(): MgnpColorAreaThumbConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
