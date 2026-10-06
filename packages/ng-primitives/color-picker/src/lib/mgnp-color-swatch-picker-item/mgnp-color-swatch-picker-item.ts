import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSwatchPickerItemState,
  NgpColorSwatchPickerItem,
  provideColorSwatchPickerItemState,
} from 'ng-primitives/color';

export type MgnpColorSwatchPickerItemCva = MgnpColorPickerCva;

export const mgnpColorSwatchPickerItemVariants = cva<MgnpColorSwatchPickerItemCva>(
  'mgnp-color-swatch-picker-item group/mgnp-color-swatch-picker-item',
  {
    variants: {
      variant: {
        default: 'mgnp-color-swatch-picker-item-variant-variant',
        primary: 'mgnp-color-swatch-picker-item-variant-primary',
        accent: 'mgnp-color-swatch-picker-item-variant-accent',
        info: 'mgnp-color-swatch-picker-item-variant-info',
        success: 'mgnp-color-swatch-picker-item-variant-success',
        warning: 'mgnp-color-swatch-picker-item-variant-warning',
        danger: 'mgnp-color-swatch-picker-item-variant-danger',
      },
    },
  }
);

export type MgnpColorSwatchPickerItemVariants = VariantProps<
  typeof mgnpColorSwatchPickerItemVariants
>;

export const [provideMgnpColorSwatchPickerItemConfig, injectMgnpColorSwatchPickerItemConfig] =
  createMgnpComponentConfig<{
    variant: MgnpColorSwatchPickerItemVariants['variant'];
  }>('MgnpColorSwatchPickerItem', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorSwatchPickerItem]',
  providers: [provideColorSwatchPickerItemState()],
  hostDirectives: [
    {
      directive: NgpColorSwatchPickerItem,
      inputs: [
        'ngpColorSwatchPickerItem:mgnpColorSwatchPickerItem',
        'ngpColorSwatchPickerItemDisabled:mgnpColorSwatchPickerItemDisabled',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorSwatchPickerItem',
})
export class MgnpColorSwatchPickerItem {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSwatchPickerItemConfig();
  public readonly state = injectColorSwatchPickerItemState();

  public constructor() {
    classes(() =>
      mgnpColorSwatchPickerItemVariants({
        variant: this._colorPicker?.variant() ?? this.config.variant,
      })
    );
  }
}
