import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorWheelThumbState,
  NgpColorWheelThumb,
  provideColorWheelThumbState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorWheelThumb]',
  providers: [provideColorWheelThumbState()],
  host: {
    class: 'mgnp-color-wheel-thumb mgnp-c-color-wheel-thumb',
    'data-mgnp-color-wheel-thumb': '',
    '[attr.data-mgnp-color-wheel-thumb-color]': 'colorPicker?.color() ?? null',
  },
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
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorWheelThumbState();
}
