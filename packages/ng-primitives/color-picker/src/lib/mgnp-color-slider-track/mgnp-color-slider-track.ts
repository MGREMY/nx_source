import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorSliderTrackState,
  NgpColorSliderTrack,
  provideColorSliderTrackState,
} from 'ng-primitives/color';

export type MgnpColorSliderTrackCva = MgnpColorPickerCva;

export const [
  mgnpColorSliderTrackVariants,
  provideMgnpColorSliderTrackConfig,
  injectMgnpColorSliderTrackConfig,
] = createMgnpComponent<MgnpColorSliderTrackCva>('color-slider-track', {
  variant: 'default',
});

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
