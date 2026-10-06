import { MgnpCombobox, MgnpComboboxCva } from '../mgnp-combobox/mgnp-combobox';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { NgpComboboxButton } from 'ng-primitives/combobox';

export type MgnpComboboxButtonCva = MgnpComboboxCva;

export const [
  mgnpComboboxButtonVariants,
  provideMgnpComboboxButtonConfig,
  injectMgnpComboboxButtonConfig,
] = createMgnpComponent<MgnpComboboxButtonCva>('combobox-button', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpComboboxButton]',
  providers: [],
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
  private readonly _combobox = inject(MgnpCombobox);

  public readonly config = injectMgnpComboboxButtonConfig();

  public constructor() {
    classes(() => mgnpComboboxButtonVariants({ variant: this._combobox.variant() }));
  }
}
