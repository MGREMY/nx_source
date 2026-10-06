import { MgnpCombobox, MgnpComboboxCva } from '../mgnp-combobox/mgnp-combobox';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { NgpComboboxDropdown } from 'ng-primitives/combobox';

export type MgnpComboboxDropdownCva = MgnpComboboxCva;

export const mgnpComboboxDropdownVariants = cva<MgnpComboboxDropdownCva>(
  'mgnp-combobox-dropdown group/mgnp-combobox-dropdown',
  {
    variants: {
      variant: {
        default: 'mgnp-combobox-dropdown-variant-default',
        primary: 'mgnp-combobox-dropdown-variant-primary',
        accent: 'mgnp-combobox-dropdown-variant-accent',
        info: 'mgnp-combobox-dropdown-variant-info',
        success: 'mgnp-combobox-dropdown-variant-success',
        warning: 'mgnp-combobox-dropdown-variant-warning',
        danger: 'mgnp-combobox-dropdown-variant-danger',
      },
    },
  }
);

export type MgnpComboboxDropdownVariants = VariantProps<typeof mgnpComboboxDropdownVariants>;

export const [provideMgnpComboboxDropdownConfig, injectMgnpComboboxDropdownConfig] =
  createMgnpComponentConfig<{
    variant: MgnpComboboxDropdownVariants['variant'];
  }>('MgnpComboboxDropdown', {
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
