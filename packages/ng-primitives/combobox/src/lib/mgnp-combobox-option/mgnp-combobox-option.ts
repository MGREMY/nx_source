import { MgnpCombobox, MgnpComboboxCva } from '../mgnp-combobox/mgnp-combobox';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { NgpComboboxOption } from 'ng-primitives/combobox';

export type MgnpComboboxOptionCva = MgnpComboboxCva;

export const [
  mgnpComboboxOptionVariants,
  provideMgnpComboboxOptionConfig,
  injectMgnpComboboxOptionConfig,
] = createMgnpComponent<MgnpComboboxOptionCva>('combobox-option', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpComboboxOption]',
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
  private readonly _combobox = inject(MgnpCombobox);

  public readonly config = injectMgnpComboboxOptionConfig();

  public constructor() {
    classes(() => mgnpComboboxOptionVariants({ variant: this._combobox.variant() }));
  }
}
