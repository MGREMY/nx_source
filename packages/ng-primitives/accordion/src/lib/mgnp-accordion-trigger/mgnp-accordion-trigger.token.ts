import { MgnpAccordionTriggerVariants } from './mgnp-accordion-trigger';

import { inject, InjectionToken, ValueProvider } from '@angular/core';

export interface MgnpAccordionTriggerConfig {
  variant: MgnpAccordionTriggerVariants['variant'];
}

const defaultConfig: MgnpAccordionTriggerConfig = {
  variant: 'default',
};

const Token = new InjectionToken<MgnpAccordionTriggerConfig>('MgnpAccordionTriggerConfig');

export function provideMgnpAccordionTriggerConfig(
  config: Partial<MgnpAccordionTriggerConfig>
): ValueProvider {
  return { provide: Token, useValue: { ...config, ...defaultConfig } };
}

export function injectMgnpAccordionTriggerConfig(): MgnpAccordionTriggerConfig {
  return inject(Token, { optional: true }) ?? defaultConfig;
}
