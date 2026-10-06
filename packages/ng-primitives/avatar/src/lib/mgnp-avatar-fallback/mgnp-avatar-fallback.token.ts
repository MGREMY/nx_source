import { MgnpAvatarFallbackVariants } from './mgnp-avatar-fallback';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAvatarFallbackConfig {
  variant: MgnpAvatarFallbackVariants['variant'];
}

const defaultConfig: MgnpAvatarFallbackConfig = {
  variant: 'default',
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
