import { Directive } from '@angular/core';
import { injectAccordionState, NgpAccordion, provideAccordionState } from 'ng-primitives/accordion';

@Directive({
  selector: '[mgnpAccordion]',
  providers: [provideAccordionState()],
  host: {
    class: 'mgnp-accordion mgnp-c-accordion',
    'data-mgnp-accordion': '',
  },
  hostDirectives: [
    {
      directive: NgpAccordion,
      inputs: [
        'ngpAccordionType:mgnpAccordionType',
        'ngpAccordionCollapsible:mgnpAccordionCollapsible',
        'ngpAccordionValue:mgnpAccordionValue',
        'ngpAccordionDisabled:mgnpAccordionDisabled',
        'ngpAccordionOrientation:mgnpAccordionOrientation',
      ],
      outputs: ['ngpAccordionValueChange:mgnpAccordionValueChange'],
    },
  ],
  exportAs: 'mgnpAccordion',
})
export class MgnpAccordion {
  protected readonly state = injectAccordionState();
}
