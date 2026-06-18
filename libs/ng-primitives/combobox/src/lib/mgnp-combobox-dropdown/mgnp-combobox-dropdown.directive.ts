import { Directive } from '@angular/core';
import { NgpComboboxDropdown } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxDropdown]',
  standalone: true,
  host: {
    class: 'mgnp-combobox-dropdown mgnp-c-combobox-dropdown',
    'data-mgnp-combobox-dropdown': '',
  },
  hostDirectives: [
    {
      directive: NgpComboboxDropdown,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpComboboxDropdown',
})
export class MgnpComboboxDropdown {}
