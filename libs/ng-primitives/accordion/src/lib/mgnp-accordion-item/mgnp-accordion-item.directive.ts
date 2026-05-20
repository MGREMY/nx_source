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
    'data-mgnp-component': 'mgnp-accordion-item',
  },
  hostDirectives: [
    {
      directive: NgpAccordionItem,
      inputs: ['ngpAccordionItemValue:value', 'ngpAccordionItemDisabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAccordionItem',
})
export class MgnpAccordionItem {
  protected readonly state = injectAccordionItemState();
}
