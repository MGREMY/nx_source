import { MgnpAvatarConfig } from '../mgnp-avatar/mgnp-avatar.token';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAvatarFallbackConfig {
  variant?: MgnpAvatarConfig['variant'];
}

const defaultConfig: MgnpAvatarFallbackConfig = {
  variant: undefined,
};

const Token = new InjectionToken<MgnpAvatarFallbackConfig>('MgnpAvatarFallbackConfig');

export function provideAvatarFallbackConfig(
  config: Partial<MgnpAvatarFallbackConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectAvatarFallbackConfig(): MgnpAvatarFallbackConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
