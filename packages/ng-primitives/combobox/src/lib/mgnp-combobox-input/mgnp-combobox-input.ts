import { MgnpCombobox } from '../mgnp-combobox/mgnp-combobox';

import { Directive, inject } from '@angular/core';
import { NgpComboboxInput } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxInput]',
  host: {
    class: 'mgnp-combobox-input mgnp-c-combobox-input',
    'data-mgnp-combobox-input': '',
    '[attr.data-mgnp-combobox-input-color]': 'combobox.color()',
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
export class MgnpComboboxInput {
  protected readonly combobox = inject(MgnpCombobox);
}
