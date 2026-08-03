import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorSwatchState,
  NgpColorSwatch,
  provideColorSwatchState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorSwatch]',
  providers: [provideColorSwatchState()],
  host: {
    class: 'mgnp-color-swatch mgnp-c-color-swatch',
    'data-mgnp-color-swatch': '',
    '[attr.data-mgnp-color-swatch-color]': 'colorPicker?.color() ?? null',
  },
  hostDirectives: [
    {
      directive: NgpColorSwatch,
      inputs: ['ngpColorSwatch:mgnpColorSwatch', 'ngpColorSwatchLabel:mgnpColorSwatchLabel'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorSwatch',
})
export class MgnpColorSwatch {
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorSwatchState();
}
