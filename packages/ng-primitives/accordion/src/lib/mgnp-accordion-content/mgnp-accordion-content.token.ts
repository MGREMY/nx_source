import { MgnpAccordionVariants } from '../mgnp-accordion/mgnp-accordion';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAccordionContentConfig {
  variant?: MgnpAccordionVariants['variant'];
}

const defaultConfig: MgnpAccordionContentConfig = {
  variant: undefined,
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
