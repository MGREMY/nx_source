import { Directive } from '@angular/core';
import {
  injectAccordionContentState,
  NgpAccordionContent,
  provideAccordionContentState,
} from 'ng-primitives/accordion';

@Directive({
  selector: '[mgnpAccordionContent]',
  standalone: true,
  providers: [provideAccordionContentState()],
  host: {
    class: 'mgnp-accordion-content mgnp-c-accordion-content',
    'data-mgnp-accordion-content': '',
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
}
