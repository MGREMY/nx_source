import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorWheelThumbState,
  NgpColorWheelThumb,
  provideColorWheelThumbState,
} from 'ng-primitives/color';

export type MgnpColorWheelThumbCva = MgnpColorPickerCva;

export const [
  mgnpColorWheelThumbVariants,
  provideMgnpColorWheelThumbConfig,
  injectMgnpColorWheelThumbConfig,
] = createMgnpComponent<MgnpColorWheelThumbCva>('color-wheel-thumb', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpColorWheelThumb]',
  providers: [provideColorWheelThumbState()],
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
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorWheelThumbConfig();
  public readonly state = injectColorWheelThumbState();

  public constructor() {
    classes(() =>
      mgnpColorWheelThumbVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
