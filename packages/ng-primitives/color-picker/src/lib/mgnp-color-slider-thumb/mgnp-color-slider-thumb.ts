import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorSliderThumbState,
  NgpColorSliderThumb,
  provideColorSliderThumbState,
} from 'ng-primitives/color';

export type MgnpColorSliderThumbCva = MgnpColorPickerCva;

export const [
  mgnpColorSliderThumbVariants,
  provideMgnpColorSliderThumbConfig,
  injectMgnpColorSliderThumbConfig,
] = createMgnpComponent<MgnpColorSliderThumbCva>('color-slider-thumb', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpColorSliderThumb]',
  providers: [provideColorSliderThumbState()],
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
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSliderThumbConfig();
  public readonly state = injectColorSliderThumbState();

  public constructor() {
    classes(() =>
      mgnpColorSliderThumbVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
