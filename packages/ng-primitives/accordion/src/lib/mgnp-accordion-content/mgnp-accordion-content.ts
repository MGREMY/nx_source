import { MgnpAccordion, MgnpAccordionCva } from '../mgnp-accordion/mgnp-accordion';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectAccordionContentState,
  injectAccordionState,
  NgpAccordionContent,
  provideAccordionContentState,
} from 'ng-primitives/accordion';

export type MgnpAccordionContentCva = MgnpAccordionCva;

export const [
  mgnpAccordionContentVariants,
  provideMgnpAccordionContentConfig,
  injectMgnpAccordionContentConfig,
] = createMgnpComponent<MgnpAccordionContentCva>('accordion-content', {
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
