import { MgnpCombobox, MgnpComboboxCva } from '../mgnp-combobox/mgnp-combobox';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { NgpComboboxDropdown } from 'ng-primitives/combobox';

export type MgnpComboboxDropdownCva = MgnpComboboxCva;

export const [
  mgnpComboboxDropdownVariants,
  provideMgnpComboboxDropdownConfig,
  injectMgnpComboboxDropdownConfig,
] = createMgnpComponent<MgnpComboboxDropdownCva>('combobox-dropdown', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpComboboxDropdown]',
  hostDirectives: [
    {
      directive: NgpComboboxDropdown,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpComboboxDropdown',
})
export class MgnpComboboxDropdown {
  private readonly _combobox = inject(MgnpCombobox);

  public readonly config = injectMgnpComboboxDropdownConfig();

  public constructor() {
    classes(() => mgnpComboboxDropdownVariants({ variant: this._combobox.variant() }));
  }
}
