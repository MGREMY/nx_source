import { MgnpAccordion, MgnpAccordionCva } from '../mgnp-accordion/mgnp-accordion';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAccordionContentState,
  injectAccordionState,
  NgpAccordionContent,
  provideAccordionContentState,
} from 'ng-primitives/accordion';

export type MgnpAccordionContentCva = MgnpAccordionCva;

export const mgnpAccordionContentVariants = cva<MgnpAccordionContentCva>(
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
  }
);

export type MgnpAccordionContentVariants = VariantProps<typeof mgnpAccordionContentVariants>;

export const [provideMgnpAccordionContentConfig, injectMgnpAccordionContentConfig] =
  createMgnpComponentConfig<{
    variant: MgnpAccordionContentVariants['variant'];
    orientation: MgnpAccordionContentVariants['orientation'];
  }>('MgnpAccordionContent', {
    variant: 'default',
    orientation: 'vertical',
  });

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

  public constructor() {
    classes(() =>
      mgnpAccordionContentVariants({
        variant: this._accordion.variant(),
        orientation: this._ngpAccordion().orientation(),
      })
    );
  }
}
