import { Directive, inject } from '@angular/core';
import { NgpComboboxDropdown } from 'ng-primitives/combobox';

const options = ['ngpComboboxDroprown'];

const error = new Error(
  `MgnpComboboxDropdown must be used with ${options.join(' / ')}`,
);

@Directive({
  selector: '[ngpComboboxDropdown][mgnpComboboxDropdown]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-combobox-dropdown',
  },
})
export class MgnpComboboxDropdown {
  protected readonly ngpComboboxDropdown = inject(NgpComboboxDropdown, {
    optional: true,
  });

  constructor() {
    if (!this.ngpComboboxDropdown) {
      console.error(this);
      throw error;
    }
  }
}
