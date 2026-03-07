import { Directive, inject } from '@angular/core';
import { NgpComboboxInput } from 'ng-primitives/combobox';

const options = ['ngpComboboxInput'];

const error = new Error(`MgnpComboboxInput must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpComboboxInput][mgnpComboboxInput]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-combobox-input',
  },
})
export class MgnpComboboxInput {
  protected readonly ngpComboboxInput = inject(NgpComboboxInput, {
    optional: true,
  });

  constructor() {
    if (!this.ngpComboboxInput) {
      console.error(this);
      throw error;
    }
  }
}
