import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSwatchPickerState,
  NgpColorSwatchPicker,
  provideColorSwatchPickerState,
} from 'ng-primitives/color';

export const [provideMgnpColorSwatchPickerConfig, injectMgnpColorSwatchPickerConfig] =
  createMgnpComponentConfig<{
    variant: MgnpColorSwatchPickerVariants['variant'];
  }>('MgnpColorSwatchPicker', {
    variant: 'default',
  });

export const mgnpColorSwatchPickerVariants = cva(
  'mgnp-color-swatch-picker group/mgnp-color-swatch-picker',
  {
    variants: {
      variant: {
        default: 'mgnp-color-swatch-picker-variant-variant',
        primary: 'mgnp-color-swatch-picker-variant-primary',
        accent: 'mgnp-color-swatch-picker-variant-accent',
        info: 'mgnp-color-swatch-picker-variant-info',
        success: 'mgnp-color-swatch-picker-variant-success',
        warning: 'mgnp-color-swatch-picker-variant-warning',
        danger: 'mgnp-color-swatch-picker-variant-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MgnpColorSwatchPickerVariants = VariantProps<typeof mgnpColorSwatchPickerVariants>;

@Directive({
  selector: '[mgnpColorSwatchPicker]',
  providers: [provideColorSwatchPickerState()],
  hostDirectives: [
    {
      directive: NgpColorSwatchPicker,
      inputs: [
        'ngpColorSwatchPickerValue:mgnpColorSwatchPickerValue',
        'ngpColorSwatchPickerDefaultValue:mgnpColorSwatchPickerDefaultValue',
        'ngpColorSwatchPickerOrientation:mgnpColorSwatchPickerOrientation',
        'ngpColorSwatchPickerDisabled:mgnpColorSwatchPickerDisabled',
      ],
      outputs: ['ngpColorSwatchPickerValueChange:mgnpColorSwatchPickerValueChange'],
    },
  ],
  exportAs: 'mgnpColorSwatchPicker',
})
export class MgnpColorSwatchPicker {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSwatchPickerConfig();
  public readonly state = injectColorSwatchPickerState();

  public constructor() {
    classes(() =>
      mgnpColorSwatchPickerVariants({
        variant: this._colorPicker?.variant() ?? this.config.variant,
      })
    );
  }
}
