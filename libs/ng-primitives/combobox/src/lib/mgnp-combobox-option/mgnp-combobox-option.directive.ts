import { Directive, inject } from '@angular/core';
import { NgpComboboxOption } from 'ng-primitives/combobox';

const options = ['ngpComboboxOption'];

const error = new Error(
  `MgnpComboboxOption must be used with ${options.join(' / ')}`,
);

@Directive({
  selector: '[ngpComboboxOption][mgnpComboboxOption]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-combobox-option',
  },
})
export class MgnpComboboxOption {
  protected readonly ngpComboboxOption = inject(NgpComboboxOption, {
    optional: true,
  });

  constructor() {
    if (!this.ngpComboboxOption) {
      console.error(this);
      throw error;
    }
  }
}
