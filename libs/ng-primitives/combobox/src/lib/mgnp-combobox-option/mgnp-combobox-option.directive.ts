import { Directive } from '@angular/core';
import { NgpComboboxOption } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxOption]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-combobox-option',
  },
  hostDirectives: [
    {
      directive: NgpComboboxOption,
      inputs: [
        'ngpComboboxOptionValue:value',
        'ngpComboboxOptionDisabled:disabled',
        'ngpComboboxOptionIndex:index',
      ],
      outputs: ['ngpComboboxOptionActivated:activated'],
    },
  ],
  exportAs: 'mgnpComboboxOption',
})
export class MgnpComboboxOption {}
