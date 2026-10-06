import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { injectMgnpColorSliderConfig } from './mgnp-color-slider.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSliderState,
  NgpColorSlider,
  provideColorSliderState,
} from 'ng-primitives/color';

export const mgnpColorSliderVariants = cva('mgnp-color-slider group/mgnp-color-slider', {
  variants: {
    variant: {
      default: 'mgnp-color-slider-variant-variant',
      primary: 'mgnp-color-slider-variant-primary',
      accent: 'mgnp-color-slider-variant-accent',
      info: 'mgnp-color-slider-variant-info',
      success: 'mgnp-color-slider-variant-success',
      warning: 'mgnp-color-slider-variant-warning',
      danger: 'mgnp-color-slider-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpColorSliderVariants = VariantProps<typeof mgnpColorSliderVariants>;

@Directive({
  selector: '[mgnpColorSlider]',
  providers: [provideColorSliderState()],
  hostDirectives: [
    {
      directive: NgpColorSlider,
      inputs: [
        'ngpColorSliderValue:mgnpColorSliderValue',
        'ngpColorSliderDefaultValue:mgnpColorSliderDefaultValue',
        'ngpColorSliderChannel:mgnpColorSliderChannel',
        'ngpColorSliderColorSpace:mgnpColorSliderColorSpace',
        'ngpColorSliderOrientation:mgnpColorSliderOrientation',
        'ngpColorSliderDisabled:mgnpColorSliderDisabled',
      ],
      outputs: ['ngpColorSliderValueChange:mgnpColorSliderValueChange'],
    },
  ],
  exportAs: 'mgnpColorSlider',
})
export class MgnpColorSlider {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSliderConfig();
  public readonly state = injectColorSliderState();

  public constructor() {
    classes(() =>
      mgnpColorSliderVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
