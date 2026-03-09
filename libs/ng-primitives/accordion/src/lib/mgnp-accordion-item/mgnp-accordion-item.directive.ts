import { Directive, inject } from '@angular/core';
import { NgpAccordionItem } from 'ng-primitives/accordion';

const options = ['ngpAccordionItem'];

const error = new Error(`MgnpAccordionItem must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpAccordionItem][mgnpAccordionItem]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-accordion-item',
  },
})
export class MgnpAccordionItem {
  protected readonly ngpAccordionItem = inject(NgpAccordionItem, { optional: true });

  constructor() {
    if (!this.ngpAccordionItem) {
      console.error(this);
      throw error;
    }
  }
}
