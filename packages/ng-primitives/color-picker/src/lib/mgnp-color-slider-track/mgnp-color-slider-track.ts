import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorSliderTrackState,
  NgpColorSliderTrack,
  provideColorSliderTrackState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorSliderTrack]',
  providers: [provideColorSliderTrackState()],
  host: {
    class: 'mgnp-color-slider-track mgnp-c-color-slider-track',
    'data-mgnp-color-slider-track': '',
    '[attr.data-mgnp-color-slider-track-color]': 'colorPicker?.color() ?? null',
  },
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
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorSliderTrackState();
}
