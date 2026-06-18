import { Directive } from '@angular/core';
import { NgpComboboxButton } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxButton]',
  standalone: true,
  providers: [],
  host: {
    'class': 'mgnp-combobox-button mgnp-c-combobox-button',
    'data-mgnp-combobox-button': '',
  },
  hostDirectives: [
    {
      directive: NgpComboboxButton,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpComboboxButton',
})
export class MgnpComboboxButton {}
