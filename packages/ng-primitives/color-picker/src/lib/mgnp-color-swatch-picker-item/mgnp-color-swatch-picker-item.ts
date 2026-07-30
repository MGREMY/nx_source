import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import {
  injectColorSwatchPickerItemState,
  NgpColorSwatchPickerItem,
  provideColorSwatchPickerItemState,
} from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorSwatchPickerItem]',
  providers: [provideColorSwatchPickerItemState()],
  host: {
    class: 'mgnp-color-swatch-picker-item mgnp-c-color-swatch-picker-item',
    'data-mgnp-color-swatch-picker-item': '',
    '[attr.data-mgnp-color-swatch-picker-item-color]': 'colorPicker?.color() ?? null',
  },
  hostDirectives: [
    {
      directive: NgpColorSwatchPickerItem,
      inputs: [
        'ngpColorSwatchPickerItem:mgnpColorSwatchPickerItem',
        'ngpColorSwatchPickerItemDisabled:mgnpColorSwatchPickerItemDisabled',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorSwatchPickerItem',
})
export class MgnpColorSwatchPickerItem {
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorSwatchPickerItemState();
}
