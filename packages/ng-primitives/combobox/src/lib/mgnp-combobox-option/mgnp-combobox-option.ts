import { MgnpCombobox } from '../mgnp-combobox/mgnp-combobox';

import { Directive, inject } from '@angular/core';
import { NgpComboboxOption } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxOption]',
  host: {
    class: 'mgnp-combobox-option mgnp-c-combobox-option',
    'data-mgnp-combobox-option': '',
    '[attr.data-mgnp-combobox-option-color]': 'combobox.color()',
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
export class MgnpComboboxOption {
  protected readonly combobox = inject(MgnpCombobox);
}
