import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { injectMgnpColorSliderTrackConfig } from './mgnp-color-slider-track.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSliderTrackState,
  NgpColorSliderTrack,
  provideColorSliderTrackState,
} from 'ng-primitives/color';

export const mgnpColorSliderTrackVariants = cva(
  'mgnp-color-slider-track group/mgnp-color-slider-track',
  {
    variants: {
      variant: {
        default: 'mgnp-color-slider-track-variant-variant',
        primary: 'mgnp-color-slider-track-variant-primary',
        accent: 'mgnp-color-slider-track-variant-accent',
        info: 'mgnp-color-slider-track-variant-info',
        success: 'mgnp-color-slider-track-variant-success',
        warning: 'mgnp-color-slider-track-variant-warning',
        danger: 'mgnp-color-slider-track-variant-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MgnpColorSliderTrackVariants = VariantProps<typeof mgnpColorSliderTrackVariants>;

@Directive({
  selector: '[mgnpColorSliderTrack]',
  providers: [provideColorSliderTrackState()],
  hostDirectives: [
    {
      directive: NgpColorSliderTrack,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorSliderTrack',
})
export class MgnpColorSliderTrack {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSliderTrackConfig();
  public readonly state = injectColorSliderTrackState();

  public constructor() {
    classes(() =>
      mgnpColorSliderTrackVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
