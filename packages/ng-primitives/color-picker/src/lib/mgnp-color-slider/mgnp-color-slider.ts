import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorSliderState,
  NgpColorSlider,
  provideColorSliderState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorSlider]',
  providers: [provideColorSliderState()],
  host: {
    class: 'mgnp-color-slider mgnp-c-color-slider',
    'data-mgnp-color-slider': '',
    '[attr.data-mgnp-color-slider-color]': 'colorPicker?.color() ?? null',
  },
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
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorSliderState();
}
