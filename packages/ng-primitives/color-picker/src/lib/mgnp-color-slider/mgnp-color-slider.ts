import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorSliderState,
  NgpColorSlider,
  provideColorSliderState,
} from 'ng-primitives/color';

export type MgnpColorSliderCva = MgnpColorPickerCva;

export const [mgnpColorSliderVariants, provideMgnpColorSliderConfig, injectMgnpColorSliderConfig] =
  createMgnpComponent<MgnpColorSliderCva>('color-slider', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorSlider]',
  providers: [provideColorSliderState()],
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
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSliderConfig();
  public readonly state = injectColorSliderState();

  public constructor() {
    classes(() =>
      mgnpColorSliderVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
