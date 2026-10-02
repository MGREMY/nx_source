import { MgnpAccordionVariants } from '../mgnp-accordion/mgnp-accordion';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAccordionItemConfig {
  variant?: MgnpAccordionVariants['variant'];
}

const defaultConfig: MgnpAccordionItemConfig = {
  variant: undefined,
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
