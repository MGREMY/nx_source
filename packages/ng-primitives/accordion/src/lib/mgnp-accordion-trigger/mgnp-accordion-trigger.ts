import { MgnpAccordion, MgnpAccordionCva } from '../mgnp-accordion/mgnp-accordion';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectAccordionState,
  injectAccordionTriggerState,
  NgpAccordionTrigger,
  provideAccordionTriggerState,
} from 'ng-primitives/accordion';

export type MgnpAccordionTriggerCva = MgnpAccordionCva;

export const [
  mgnpAccordionTriggerVariants,
  provideMgnpAccordionTriggerConfig,
  injectMgnpAccordionTriggerConfig,
] = createMgnpComponent<MgnpAccordionTriggerCva>('accordion-trigger', {
  variant: 'default',
  orientation: 'vertical',
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
