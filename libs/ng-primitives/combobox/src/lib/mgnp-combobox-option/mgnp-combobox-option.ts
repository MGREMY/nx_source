import { Directive } from '@angular/core';
import { NgpComboboxOption } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxOption]',
  standalone: true,
  host: {
    class: 'mgnp-combobox-option mgnp-c-combobox-option',
    'data-mgnp-combobox-option': '',
  },
  hostDirectives: [
    {
      directive: NgpComboboxOption,
      inputs: [
        'ngpComboboxOptionValue:mgnpComboboxOptionValue',
        'ngpComboboxOptionDisabled:mgnpComboboxOptionDisabled',
        'ngpComboboxOptionIndex:mgnpComboboxOptionIndex',
      ],
      outputs: ['ngpComboboxOptionActivated:mgnpComboboxOptionActivated'],
    },
  ],
  exportAs: 'mgnpComboboxOption',
})
export class MgnpComboboxOption {}
