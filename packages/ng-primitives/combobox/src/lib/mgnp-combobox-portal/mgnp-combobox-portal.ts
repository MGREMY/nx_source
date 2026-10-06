import { Directive } from '@angular/core';
import { NgpComboboxPortal } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxPortal]',
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
