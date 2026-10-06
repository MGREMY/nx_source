import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorSwatchPickerState,
  NgpColorSwatchPicker,
  provideColorSwatchPickerState,
} from 'ng-primitives/color';

export type MgnpColorSwatchPickerCva = MgnpColorPickerCva;

export const [
  mgnpColorSwatchPickerVariants,
  provideMgnpColorSwatchPickerConfig,
  injectMgnpColorSwatchPickerConfig,
] = createMgnpComponent<MgnpColorSwatchPickerCva>('color-swatch-picker', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpColorSwatchPicker]',
  providers: [provideColorSwatchPickerState()],
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
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSwatchPickerConfig();
  public readonly state = injectColorSwatchPickerState();

  public constructor() {
    classes(() =>
      mgnpColorSwatchPickerVariants({
        variant: this._colorPicker?.variant() ?? this.config.variant,
      })
    );
  }
}
