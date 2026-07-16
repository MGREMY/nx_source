import { MgnpAccordion } from '../mgnp-accordion/mgnp-accordion';

import { Directive, inject } from '@angular/core';
import {
  injectAccordionItemState,
  NgpAccordionItem,
  provideAccordionItemState,
} from 'ng-primitives/accordion';

@Directive({
  selector: '[mgnpAccordionItem]',
  providers: [provideAccordionItemState()],
  host: {
    class: 'mgnp-accordion-item mgnp-c-accordion-item',
    'data-mgnp-accordion-item': '',
    '[attr.data-mgnp-accordion-item-color]': 'accordion.color()',
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
  protected readonly accordion = inject(MgnpAccordion);
}
