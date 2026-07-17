import { MgnpCombobox } from '../mgnp-combobox/mgnp-combobox';

import { Directive, inject } from '@angular/core';
import { NgpComboboxDropdown } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxDropdown]',
  host: {
    class: 'mgnp-combobox-dropdown mgnp-c-combobox-dropdown',
    'data-mgnp-combobox-dropdown': '',
    '[attr.data-mgnp-combobox-dropdown-color]': 'combobox.color()',
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
export class MgnpComboboxDropdown {
  protected readonly combobox = inject(MgnpCombobox);
}
