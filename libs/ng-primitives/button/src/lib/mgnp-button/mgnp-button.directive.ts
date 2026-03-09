import { Directive, inject } from '@angular/core';
import { NgpAccordionTrigger } from 'ng-primitives/accordion';
import { NgpButton } from 'ng-primitives/button';
import { NgpComboboxButton } from 'ng-primitives/combobox';
import { NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltipTrigger } from 'ng-primitives/tooltip';

const options = [
  'ngpButton',
  'ngpComboboxButton',
  'ngpMenuTrigger',
  'ngpTooltipTrigger',
  'ngpAccordionTrigger',
];

const error = new Error(`MgnpButton must be used with ${options.join(' / ')}`);

@Directive({
  selector:
    '[ngpButton][mgnpButton], [ngpComboboxButton][mgnpButton], [ngpMenuTrigger][mgnpButton], [ngpTooltipTrigger][mgnpButton], [ngpAccordionTrigger][mgnpButton]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-button',
  },
})
export class MgnpButton {
  protected readonly ngpButton = inject(NgpButton, { optional: true });
  protected readonly ngpComboboxButton = inject(NgpComboboxButton, {
    optional: true,
  });
  protected readonly ngpMenuTrigger = inject(NgpMenuTrigger, {
    optional: true,
  });
  protected readonly ngpTooltipTrigger = inject(NgpTooltipTrigger, { optional: true });
  protected readonly ngpAccordionTrigger = inject(NgpAccordionTrigger, { optional: true });

  constructor() {
    if (
      !this.ngpButton &&
      !this.ngpComboboxButton &&
      !this.ngpMenuTrigger &&
      !this.ngpTooltipTrigger &&
      !this.ngpAccordionTrigger
    ) {
      console.error(this);
      throw error;
    }
  }
}
