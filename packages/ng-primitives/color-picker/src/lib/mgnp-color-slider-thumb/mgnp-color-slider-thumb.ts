import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorSliderThumbState,
  NgpColorSliderThumb,
  provideColorSliderThumbState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorSliderThumb]',
  providers: [provideColorSliderThumbState()],
  host: {
    class: 'mgnp-color-slider-thumb mgnp-c-color-slider-thumb',
    'data-mgnp-color-slider-thumb': '',
    '[attr.data-mgnp-color-slider-thumb-color]': 'colorPicker?.color() ?? null',
  },
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
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorSliderThumbState();
}
