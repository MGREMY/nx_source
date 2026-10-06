import { MgnpAccordion } from '../mgnp-accordion/mgnp-accordion';
import { injectMgnpAccordionContentConfig } from './mgnp-accordion-content.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAccordionContentState,
  injectAccordionState,
  NgpAccordionContent,
  provideAccordionContentState,
} from 'ng-primitives/accordion';

export const mgnpAccordionContentVariants = cva(
  'mgnp-accordion-content group/mgnp-accordion-content',
  {
    variants: {
      variant: {
        default: 'mgnp-accordion-content-variant-default',
      },
      orientation: {
        vertical: 'mgnp-accordion-content-orientation-vertical',
        horizontal: 'mgnp-accordion-content-orientation-horizontal',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MgnpAccordionContentVariants = VariantProps<typeof mgnpAccordionContentVariants>;

@Directive({
  selector: '[mgnpAccordionContent]',
  providers: [provideAccordionContentState()],
  hostDirectives: [
    {
      directive: NgpAccordionContent,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAccordionContent',
})
export class MgnpAccordionContent {
  private readonly _ngpAccordion = injectAccordionState();
  private readonly _accordion = inject(MgnpAccordion);

  public readonly config = injectMgnpAccordionContentConfig();
  public readonly state = injectAccordionContentState();

  constructor() {
    classes(() =>
      mgnpAccordionContentVariants({
        variant: this._accordion.variant(),
        orientation: this._ngpAccordion().orientation(),
      })
    );
  }
}
