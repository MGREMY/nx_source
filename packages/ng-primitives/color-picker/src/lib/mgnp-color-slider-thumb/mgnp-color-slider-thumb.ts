import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { injectMgnpColorSliderThumbConfig } from './mgnp-color-slider-thumb.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSliderThumbState,
  NgpColorSliderThumb,
  provideColorSliderThumbState,
} from 'ng-primitives/color';

export const mgnpColorSliderThumbVariants = cva(
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
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MgnpColorSliderThumbVariants = VariantProps<typeof mgnpColorSliderThumbVariants>;

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
