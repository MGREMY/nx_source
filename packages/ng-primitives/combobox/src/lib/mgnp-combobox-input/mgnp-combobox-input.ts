import { MgnpCombobox } from '../mgnp-combobox/mgnp-combobox';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { NgpComboboxInput } from 'ng-primitives/combobox';

export const [provideMgnpComboboxInputConfig, injectMgnpComboboxInputConfig] =
  createMgnpComponentConfig<{
    variant: MgnpComboboxInputVariants['variant'];
  }>('MgnpComboboxInput', {
    variant: 'default',
  });

export const mgnpComboboxInputVariants = cva('mgnp-combobox-input group/mgnp-combobox-input', {
  variants: {
    variant: {
      default: 'mgnp-combobox-input-variant-default',
      primary: 'mgnp-combobox-input-variant-primary',
      accent: 'mgnp-combobox-input-variant-accent',
      info: 'mgnp-combobox-input-variant-info',
      success: 'mgnp-combobox-input-variant-success',
      warning: 'mgnp-combobox-input-variant-warning',
      danger: 'mgnp-combobox-input-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpComboboxInputVariants = VariantProps<typeof mgnpComboboxInputVariants>;

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
