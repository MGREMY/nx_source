import { Directive, inject } from '@angular/core';
import { NgpAccordionContent } from 'ng-primitives/accordion';

const options = ['ngpAccordion'];

const error = new Error(`MgnpAccordionContent must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpAccordionContent][mgnpAccordionContent]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-accordion-content',
  },
})
export class MgnpAccordionContent {
  protected readonly ngpAccordionContent = inject(NgpAccordionContent, { optional: true });

  constructor() {
    if (!this.ngpAccordionContent) {
      console.error(this);
      throw error;
    }
  }
}
