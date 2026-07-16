import { MgnpAccordion } from '../mgnp-accordion/mgnp-accordion';

import { Directive, inject } from '@angular/core';
import {
  injectAccordionTriggerState,
  NgpAccordionTrigger,
  provideAccordionTriggerState,
} from 'ng-primitives/accordion';

@Directive({
  selector: '[mgnpAccordionTrigger]',
  providers: [provideAccordionTriggerState()],
  host: {
    class: 'mgnp-accordion-trigger mgnp-c-accordion-trigger',
    'data-mgnp-accordion-trigger': '',
    '[attr.data-mgnp-accordion-trigger-color]': 'accordion.color()',
  },
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
  protected readonly state = injectAccordionTriggerState();
  protected readonly accordion = inject(MgnpAccordion);
}
