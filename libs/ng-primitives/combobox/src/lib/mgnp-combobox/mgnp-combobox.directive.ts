import { Directive, inject } from '@angular/core';
import { NgpCombobox } from 'ng-primitives/combobox';

const options = ['ngpCombobox'];

const error = new Error(`MgnpCombobox must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpCombobox][mgnpCombobox]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-combobox',
  },
})
export class MgnpCombobox {
  protected readonly ngpCombobox = inject(NgpCombobox, { optional: true });

  constructor() {
    if (!this.ngpCombobox) {
      console.error(this);
      throw error;
    }
  }
}
