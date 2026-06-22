import { Directive } from '@angular/core';
import {
  injectAccordionItemState,
  NgpAccordionItem,
  provideAccordionItemState,
} from 'ng-primitives/accordion';

@Directive({
  selector: '[mgnpAccordionItem]',
  standalone: true,
  providers: [provideAccordionItemState()],
  host: {
    class: 'mgnp-accordion-item mgnp-c-accordion-item',
    'data-mgnp-accordion-item': '',
  },
  hostDirectives: [
    {
      directive: NgpAccordionItem,
      inputs: [
        'ngpAccordionItemValue:mgnpAccordionItemValue',
        'ngpAccordionItemDisabled:mgnpAccordionItemDisabled',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAccordionItem',
})
export class MgnpAccordionItem {
  protected readonly state = injectAccordionItemState();
}
