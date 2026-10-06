import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSwatchState,
  NgpColorSwatch,
  provideColorSwatchState,
} from 'ng-primitives/color';

export type MgnpColorSwatchCva = MgnpColorPickerCva;

export const mgnpColorSwatchVariants = cva<MgnpColorSwatchCva>(
  'mgnp-color-swatch group/mgnp-color-swatch',
  {
    variants: {
      variant: {
        default: 'mgnp-color-swatch-variant-variant',
        primary: 'mgnp-color-swatch-variant-primary',
        accent: 'mgnp-color-swatch-variant-accent',
        info: 'mgnp-color-swatch-variant-info',
        success: 'mgnp-color-swatch-variant-success',
        warning: 'mgnp-color-swatch-variant-warning',
        danger: 'mgnp-color-swatch-variant-danger',
      },
    },
  }
);

export type MgnpColorSwatchVariants = VariantProps<typeof mgnpColorSwatchVariants>;

export const [provideMgnpColorSwatchConfig, injectMgnpColorSwatchConfig] =
  createMgnpComponentConfig<{
    variant: MgnpColorSwatchVariants['variant'];
  }>('MgnpColorSwatch', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorSwatch]',
  providers: [provideColorSwatchState()],
  hostDirectives: [
    {
      directive: NgpColorSwatch,
      inputs: ['ngpColorSwatch:mgnpColorSwatch', 'ngpColorSwatchLabel:mgnpColorSwatchLabel'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorSwatch',
})
export class MgnpColorSwatch {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSwatchConfig();
  public readonly state = injectColorSwatchState();

  public constructor() {
    classes(() =>
      mgnpColorSwatchVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
