import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorWheelThumbState,
  NgpColorWheelThumb,
  provideColorWheelThumbState,
} from 'ng-primitives/color';

export type MgnpColorWheelThumbCva = MgnpColorPickerCva;

export const mgnpColorWheelThumbVariants = cva<MgnpColorWheelThumbCva>(
  'mgnp-color-wheel-thumb group/mgnp-color-wheel-thumb',
  {
    variants: {
      variant: {
        default: 'mgnp-color-wheel-thumb-variant-variant',
        primary: 'mgnp-color-wheel-thumb-variant-primary',
        accent: 'mgnp-color-wheel-thumb-variant-accent',
        info: 'mgnp-color-wheel-thumb-variant-info',
        success: 'mgnp-color-wheel-thumb-variant-success',
        warning: 'mgnp-color-wheel-thumb-variant-warning',
        danger: 'mgnp-color-wheel-thumb-variant-danger',
      },
    },
  }
);

export type MgnpColorWheelThumbVariants = VariantProps<typeof mgnpColorWheelThumbVariants>;

export const [provideMgnpWheelThumbConfig, injectMgnpColorWheelThumbConfig] =
  createMgnpComponentConfig<{
    variant: MgnpColorWheelThumbVariants['variant'];
  }>('MgnpColorWheelThumb', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorWheelThumb]',
  providers: [provideColorWheelThumbState()],
  hostDirectives: [
    {
      directive: NgpColorWheelThumb,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorWheelThumb',
})
export class MgnpColorWheelThumb {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorWheelThumbConfig();
  public readonly state = injectColorWheelThumbState();

  public constructor() {
    classes(() =>
      mgnpColorWheelThumbVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
