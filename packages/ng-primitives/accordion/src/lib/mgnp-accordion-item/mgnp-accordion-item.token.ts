import { MgnpAccordionItemVariants } from './mgnp-accordion-item';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAccordionItemConfig {
  variant: MgnpAccordionItemVariants['variant'];
}

const defaultConfig: MgnpAccordionItemConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpAccordionItemConfig>('MgnpAccordionItemConfig');

export function provideMgnpAccordionItemConfig(
  config: Partial<MgnpAccordionItemConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...config, ...defaultConfig } };
}

export function injectMgnpAccordionItemConfig(): MgnpAccordionItemConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
