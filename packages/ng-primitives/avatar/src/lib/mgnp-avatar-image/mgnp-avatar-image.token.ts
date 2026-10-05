import { MgnpAvatarConfig } from '../mgnp-avatar/mgnp-avatar.token';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAvatarImageConfig {
  variant?: MgnpAvatarConfig['variant'];
}

const defaultConfig: MgnpAvatarImageConfig = {
  variant: undefined,
};

const Token = new InjectionToken<MgnpAvatarImageConfig>('MgnpAvatarImageConfig');

export function provideAvatarImageConfig(config: Partial<MgnpAvatarImageConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectAvatarImageConfig(): MgnpAvatarImageConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
