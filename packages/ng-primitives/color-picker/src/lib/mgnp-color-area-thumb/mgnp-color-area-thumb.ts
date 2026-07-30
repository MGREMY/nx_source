import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorAreaThumbState,
  NgpColorAreaThumb,
  provideColorAreaThumbState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorAreaThumb]',
  providers: [provideColorAreaThumbState()],
  host: {
    class: 'mgnp-color-area-thumb mgnp-c-color-area-thumb',
    'data-mgnp-color-area-thumb': '',
    '[attr.data-mgnp-color-area-thumb-color]': 'colorPicker?.color() ?? null',
  },
  hostDirectives: [
    {
      directive: NgpColorAreaThumb,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorAreaThumb',
})
export class MgnpColorAreaThumb {
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorAreaThumbState();
}
