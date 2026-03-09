import { Directive, inject } from '@angular/core';
import { NgpAccordion } from 'ng-primitives/accordion';

const options = ['ngpAccordion'];

const error = new Error(`MgnpAccordion must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpAccordion][mgnpAccordion]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-accordion',
  },
})
export class MgnpAccordion {
  protected readonly ngpAccordion = inject(NgpAccordion, { optional: true });

  constructor() {
    if (!this.ngpAccordion) {
      console.error(this);
      throw error;
    }
  }
}
