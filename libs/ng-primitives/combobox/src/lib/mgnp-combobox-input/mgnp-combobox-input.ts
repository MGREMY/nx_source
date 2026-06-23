import { Directive } from '@angular/core';
import { NgpComboboxInput } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxInput]',
  standalone: true,
  host: {
    class: 'mgnp-combobox-input mgnp-c-combobox-input',
    'data-mgnp-combobox-input': '',
  },
  hostDirectives: [
    {
      directive: NgpComboboxInput,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpComboboxInput',
})
export class MgnpComboboxInput {}
