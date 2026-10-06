import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorSwatchPickerItemState,
  NgpColorSwatchPickerItem,
  provideColorSwatchPickerItemState,
} from 'ng-primitives/color';

export type MgnpColorSwatchPickerItemCva = MgnpColorPickerCva;

export const [
  mgnpColorSwatchPickerItemVariants,
  provideMgnpColorSwatchPickerItemConfig,
  injectMgnpColorSwatchPickerItemConfig,
] = createMgnpComponent<MgnpColorSwatchPickerItemCva>('color-swatch-picker-item', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpColorSwatchPickerItem]',
  providers: [provideColorSwatchPickerItemState()],
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
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSwatchPickerItemConfig();
  public readonly state = injectColorSwatchPickerItemState();

  public constructor() {
    classes(() =>
      mgnpColorSwatchPickerItemVariants({
        variant: this._colorPicker?.variant() ?? this.config.variant,
      })
    );
  }
}
