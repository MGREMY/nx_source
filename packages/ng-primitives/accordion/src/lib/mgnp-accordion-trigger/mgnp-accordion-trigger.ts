import { MgnpAccordion } from '../mgnp-accordion/mgnp-accordion';
import { injectMgnpAccordionTriggerConfig } from './mgnp-accordion-trigger.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAccordionState,
  injectAccordionTriggerState,
  NgpAccordionTrigger,
  provideAccordionTriggerState,
} from 'ng-primitives/accordion';

export const mgnpAccordionTriggerVariants = cva(
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
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MgnpAccordionTriggerVariants = VariantProps<typeof mgnpAccordionTriggerVariants>;

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
