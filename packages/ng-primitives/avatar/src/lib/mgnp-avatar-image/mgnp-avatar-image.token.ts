import { MgnpAvatarImageVariants } from './mgnp-avatar-image';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAvatarImageConfig {
  variant: MgnpAvatarImageVariants['variant'];
}

const defaultConfig: MgnpAvatarImageConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpAvatarImageConfig>('MgnpAvatarImageConfig');

export function provideAvatarImageConfig(config: Partial<MgnpAvatarImageConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectAvatarImageConfig(): MgnpAvatarImageConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
