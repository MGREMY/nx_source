import { MgnpAvatarVariants } from './mgnp-avatar';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAvatarConfig {
  variant: MgnpAvatarVariants['variant'];
}

const defaultConfig: MgnpAvatarConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpAvatarConfig>('MgnpAvatarConfig');

export function provideMgnpAvatarConfig(config: Partial<MgnpAvatarConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpAvatarConfig(): MgnpAvatarConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
