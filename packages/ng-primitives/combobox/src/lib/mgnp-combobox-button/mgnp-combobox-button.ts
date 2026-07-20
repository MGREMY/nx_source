import { MgnpCombobox } from '../mgnp-combobox/mgnp-combobox';

import { Directive, inject } from '@angular/core';
import { NgpComboboxButton } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxButton]',
  providers: [],
  host: {
    class: 'mgnp-combobox-button mgnp-c-combobox-button',
    'data-mgnp-combobox-button': '',
    '[attr.data-mgnp-combobox-button-color]': 'combobox.color()',
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
export class MgnpComboboxButton {
  protected readonly combobox = inject(MgnpCombobox);
}
