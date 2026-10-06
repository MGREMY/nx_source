import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { injectColorWheelState, NgpColorWheel, provideColorWheelState } from 'ng-primitives/color';

export type MgnpColorWheelCva = MgnpColorPickerCva;

export const [mgnpColorWheelVariants, provideMgnpColorWheelConfig, injectMgnpColorWheelConfig] =
  createMgnpComponent<MgnpColorWheelCva>('color-wheel', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorWheel]',
  providers: [provideColorWheelState()],
  hostDirectives: [
    {
      directive: NgpColorWheel,
      inputs: [
        'ngpColorWheelValue:mgnpColorWheelValue',
        'ngpColorWheelDefaultValue:mgnpColorWheelDefaultValue',
        'ngpColorWheelColorSpace:mgnpColorWheelColorSpace',
        'ngpColorWheelDisabled:mgnpColorWheelDisabled',
      ],
      outputs: ['ngpColorWheelValueChange:mgnpColorWheelValueChange'],
    },
  ],
  exportAs: 'mgnpColorWheel',
})
export class MgnpColorWheel {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorWheelConfig();
  public readonly state = injectColorWheelState();

  public constructor() {
    classes(() =>
      mgnpColorWheelVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
