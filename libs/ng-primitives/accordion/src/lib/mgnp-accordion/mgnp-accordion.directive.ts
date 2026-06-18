import { Directive } from '@angular/core';
import { injectAccordionState, NgpAccordion, provideAccordionState } from 'ng-primitives/accordion';

@Directive({
  selector: '[mgnpAccordion]',
  standalone: true,
  providers: [provideAccordionState()],
  host: {
    class: 'mgnp-accordion mgnp-c-accordion',
    'data-mgnp-accordion': '',
  },
  hostDirectives: [
    {
      directive: NgpAccordion,
      inputs: [
        'ngpAccordionType:type',
        'ngpAccordionCollapsible:collapsible',
        'ngpAccordionValue:value',
        'ngpAccordionDisabled:disabled',
        'ngpAccordionOrientation:orientation',
      ],
      outputs: ['ngpAccordionValueChange:valueChange'],
    },
  ],
  exportAs: 'mgnpAccordion',
})
export class MgnpAccordion {
  protected readonly state = injectAccordionState();
}
