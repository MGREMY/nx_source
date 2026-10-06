import { MgnpCombobox, MgnpComboboxCva } from '../mgnp-combobox/mgnp-combobox';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { NgpComboboxInput } from 'ng-primitives/combobox';

export type MgnpComboboxInputCva = MgnpComboboxCva;

export const [
  mgnpComboboxInputVariants,
  provideMgnpComboboxInputConfig,
  injectMgnpComboboxInputConfig,
] = createMgnpComponent<MgnpComboboxInputCva>('combobox-input', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpComboboxInput]',
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
  private readonly _combobox = inject(MgnpCombobox);

  public readonly config = injectMgnpComboboxInputConfig();

  public constructor() {
    classes(() => mgnpComboboxInputVariants({ variant: this._combobox.variant() }));
  }
}
