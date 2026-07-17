import { MgnpCombobox } from '../mgnp-combobox/mgnp-combobox';

import { Directive, inject } from '@angular/core';
import { NgpComboboxPortal } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpComboboxPortal]',
  host: {
    class: 'mgnp-combobox-portal mgnp-c-combobox-portal',
    'data-mgnp-combobox-portal': '',
    '[attr.data-mgnp-combobox-portal-color]': 'combobox.color()',
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
export class MgnpComboboxPortal {
  protected readonly combobox = inject(MgnpCombobox);
}
