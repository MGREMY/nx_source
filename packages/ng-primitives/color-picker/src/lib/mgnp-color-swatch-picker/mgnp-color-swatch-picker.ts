import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorSwatchPickerState,
  NgpColorSwatchPicker,
  provideColorSwatchPickerState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorSwatchPicker]',
  providers: [provideColorSwatchPickerState()],
  host: {
    class: 'mgnp-color-swatch-picker mgnp-c-color-swatch-picker',
    'data-mgnp-color-swatch-picker': '',
    '[attr.data-mgnp-color-swatch-picker-color]': 'colorPicker?.color() ?? null',
  },
  hostDirectives: [
    {
      directive: NgpColorSwatchPicker,
      inputs: [
        'ngpColorSwatchPickerValue:mgnpColorSwatchPickerValue',
        'ngpColorSwatchPickerDefaultValue:mgnpColorSwatchPickerDefaultValue',
        'ngpColorSwatchPickerOrientation:mgnpColorSwatchPickerOrientation',
        'ngpColorSwatchPickerDisabled:mgnpColorSwatchPickerDisabled',
      ],
      outputs: ['ngpColorSwatchPickerValueChange:mgnpColorSwatchPickerValueChange'],
    },
  ],
  exportAs: 'mgnpColorSwatchPicker',
})
export class MgnpColorSwatchPicker {
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorSwatchPickerState();
}
