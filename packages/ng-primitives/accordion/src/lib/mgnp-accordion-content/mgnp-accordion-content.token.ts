import { MgnpAccordionContentVariants } from './mgnp-accordion-content';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAccordionContentConfig {
  variant: MgnpAccordionContentVariants['variant'];
}

const defaultConfig: MgnpAccordionContentConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpAccordionContentConfig>('MgnpAccordionContentConfig');

export function provideMgnpAccordionContentConfig(
  config: Partial<MgnpAccordionContentConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...config, ...defaultConfig } };
}

export function injectMgnpAccordionContentConfig(): MgnpAccordionContentConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
