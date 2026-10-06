import { MgnpCombobox } from '../mgnp-combobox/mgnp-combobox';
import { injectMgnpComboboxButtonConfig } from './mgnp-combobox-button.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { NgpComboboxButton } from 'ng-primitives/combobox';

export const mgnpComboboxButtonVariants = cva('mgnp-combobox-button group/mgnp-combobox-button', {
  variants: {
    variant: {
      default: 'mgnp-combobox-button-variant-default',
      primary: 'mgnp-combobox-button-variant-primary',
      accent: 'mgnp-combobox-button-variant-accent',
      info: 'mgnp-combobox-button-variant-info',
      success: 'mgnp-combobox-button-variant-success',
      warning: 'mgnp-combobox-button-variant-warning',
      danger: 'mgnp-combobox-button-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpComboboxButtonVariants = VariantProps<typeof mgnpComboboxButtonVariants>;

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
