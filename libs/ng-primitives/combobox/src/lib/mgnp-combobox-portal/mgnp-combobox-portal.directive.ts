import { Directive } from '@angular/core';
import { NgpComboboxPortal } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxPortal]',
  standalone: true,
  host: {
    class: 'mgnp-combobox-portal mgnp-c-combobox-portal',
    'data-mgnp-combobox-portal': '',
  },
  hostDirectives: [
    {
      directive: NgpComboboxPortal,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpComboboxPortal',
})
export class MgnpComboboxPortal {}
