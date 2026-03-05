import { Directive, inject } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { NgpComboboxButton } from 'ng-primitives/combobox';
import { NgpMenuTrigger } from 'ng-primitives/menu';

const options = ['ngpButton', 'ngpComboboxButton', 'ngpMenuTrigger'];

const error = new Error(`MgnpButton must be used with ${options.join(' / ')}`);

@Directive({
  selector:
    '[ngpButton][mgnpButton], [ngpComboboxButton][mgnpButton], [ngpMenuTrigger][mgnpButton]',
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

  constructor() {
    if (!this.ngpButton && !this.ngpComboboxButton && !this.ngpMenuTrigger) {
      console.error(this);
      throw error;
    }
  }
}
