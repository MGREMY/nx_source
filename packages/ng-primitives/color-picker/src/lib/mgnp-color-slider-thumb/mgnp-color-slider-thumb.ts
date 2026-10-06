import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSliderThumbState,
  NgpColorSliderThumb,
  provideColorSliderThumbState,
} from 'ng-primitives/color';

export type MgnpColorSliderThumbCva = MgnpColorPickerCva;

export const mgnpColorSliderThumbVariants = cva<MgnpColorSliderThumbCva>(
  'mgnp-color-slider-thumb group/mgnp-color-slider-thumb',
  {
    variants: {
      variant: {
        default: 'mgnp-color-slider-thumb-variant-variant',
        primary: 'mgnp-color-slider-thumb-variant-primary',
        accent: 'mgnp-color-slider-thumb-variant-accent',
        info: 'mgnp-color-slider-thumb-variant-info',
        success: 'mgnp-color-slider-thumb-variant-success',
        warning: 'mgnp-color-slider-thumb-variant-warning',
        danger: 'mgnp-color-slider-thumb-variant-danger',
      },
    },
  }
);

export type MgnpColorSliderThumbVariants = VariantProps<typeof mgnpColorSliderThumbVariants>;

export const [provideMgnpColorSliderThumbConfig, injectMgnpColorSliderThumbConfig] =
  createMgnpComponentConfig<{
    variant: MgnpColorSliderThumbVariants['variant'];
  }>('MgnpColorSliderThumb', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorSliderThumb]',
  providers: [provideColorSliderThumbState()],
  hostDirectives: [
    {
      directive: NgpColorSliderThumb,
      inputs: [],
      outputs: [
        'ngpColorSliderThumbDragStart:mgnpColorSliderThumbDragStart',
        'ngpColorSliderThumbDragEnd:mgnpColorSliderThumbDragEnd',
      ],
    },
  ],
  exportAs: 'mgnpColorSliderThumb',
})
export class MgnpColorSliderThumb {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSliderThumbConfig();
  public readonly state = injectColorSliderThumbState();

  public constructor() {
    classes(() =>
      mgnpColorSliderThumbVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
