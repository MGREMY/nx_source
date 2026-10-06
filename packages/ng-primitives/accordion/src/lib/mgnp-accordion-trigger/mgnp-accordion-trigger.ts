import { MgnpAccordion, MgnpAccordionCva } from '../mgnp-accordion/mgnp-accordion';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAccordionState,
  injectAccordionTriggerState,
  NgpAccordionTrigger,
  provideAccordionTriggerState,
} from 'ng-primitives/accordion';

export type MgnpAccordionTriggerCva = MgnpAccordionCva;

export const mgnpAccordionTriggerVariants = cva<MgnpAccordionTriggerCva>(
  'mgnp-accordion-trigger group/mgnp-accordion-trigger',
  {
    variants: {
      variant: {
        default: 'mgnp-accordion-trigger-variant-default',
      },
      orientation: {
        vertical: 'mgnp-accordion-trigger-orientation-vertical',
        horizontal: 'mgnp-accordion-trigger-orientation-horizontal',
      },
    },
  }
);

export type MgnpAccordionTriggerVariants = VariantProps<typeof mgnpAccordionTriggerVariants>;

export const [provideMgnpAccordionTriggerConfig, injectMgnpAccordionTriggerConfig] =
  createMgnpComponentConfig<{
    variant: MgnpAccordionTriggerVariants['variant'];
  }>('MgnpAccordionTrigger', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpAccordionTrigger]',
  providers: [provideAccordionTriggerState()],
  hostDirectives: [
    {
      directive: NgpAccordionTrigger,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAccordionTrigger',
})
export class MgnpAccordionTrigger {
  private readonly _ngpAccordion = injectAccordionState();
  private readonly _accordion = inject(MgnpAccordion);

  public readonly config = injectMgnpAccordionTriggerConfig();
  public readonly state = injectAccordionTriggerState();

  public constructor() {
    classes(() =>
      mgnpAccordionTriggerVariants({
        variant: this._accordion.variant(),
        orientation: this._ngpAccordion().orientation(),
      })
    );
  }
}
