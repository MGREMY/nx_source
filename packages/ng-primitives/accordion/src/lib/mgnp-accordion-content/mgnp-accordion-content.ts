import { MgnpAccordion } from '../mgnp-accordion/mgnp-accordion';

import { Directive, inject } from '@angular/core';
import {
  injectAccordionContentState,
  NgpAccordionContent,
  provideAccordionContentState,
} from 'ng-primitives/accordion';

@Directive({
  selector: '[mgnpAccordionContent]',
  providers: [provideAccordionContentState()],
  host: {
    class: 'mgnp-accordion-content mgnp-c-accordion-content',
    'data-mgnp-accordion-content': '',
    '[attr.data-mgnp-accordion-content-color]': 'accordion.color()',
  },
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
  protected readonly state = injectAccordionContentState();
  protected readonly accordion = inject(MgnpAccordion);
}
