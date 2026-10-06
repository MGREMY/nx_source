import { MgnpCombobox, MgnpComboboxCva } from '../mgnp-combobox/mgnp-combobox';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { NgpComboboxOption } from 'ng-primitives/combobox';

export type MgnpComboboxOptionCva = MgnpComboboxCva;

export const mgnpComboboxOptionVariants = cva<MgnpComboboxOptionCva>(
  'mgnp-combobox-option group/mgnp-combobox-option',
  {
    variants: {
      variant: {
        default: 'mgnp-combobox-option-variant-default',
        primary: 'mgnp-combobox-option-variant-primary',
        accent: 'mgnp-combobox-option-variant-accent',
        info: 'mgnp-combobox-option-variant-info',
        success: 'mgnp-combobox-option-variant-success',
        warning: 'mgnp-combobox-option-variant-warning',
        danger: 'mgnp-combobox-option-variant-danger',
      },
    },
  }
);

export type MgnpComboboxOptionVariants = VariantProps<typeof mgnpComboboxOptionVariants>;

export const [provideMgnpComboboxOptionConfig, injectMgnpComboboxOptionConfig] =
  createMgnpComponentConfig<{
    variant: MgnpComboboxOptionVariants['variant'];
  }>('MgnpComboboxOption', {
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
