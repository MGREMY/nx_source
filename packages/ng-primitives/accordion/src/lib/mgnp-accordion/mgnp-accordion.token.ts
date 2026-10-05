import { MgnpAccordionVariants } from './mgnp-accordion';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAccordionConfig {
  variant: MgnpAccordionVariants['variant'];
}

const defaultConfig: MgnpAccordionConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpAccordionConfig>('MgnpAccordionConfig');

export function provideMgnpAccordionConfig(config: Partial<MgnpAccordionConfig>): ValueProvider {
  return { provide: Token, useValue: { ...defaultConfig, ...config } };
}

export function injectMgnpAccordionConfig(): MgnpAccordionConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
