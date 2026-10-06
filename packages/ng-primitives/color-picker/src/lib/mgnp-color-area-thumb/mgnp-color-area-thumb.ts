import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorAreaThumbState,
  NgpColorAreaThumb,
  provideColorAreaThumbState,
} from 'ng-primitives/color';

export type MgnpColorAreaThumbCva = MgnpColorPickerCva;

export const [
  mgnpColorAreaThumbVariants,
  provideMgnpColorAreaThumbConfig,
  injectMgnpColorAreaThumbConfig,
] = createMgnpComponent<MgnpColorAreaThumbCva>('color-area-thumb', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpColorAreaThumb]',
  providers: [provideColorAreaThumbState()],
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
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorAreaThumbConfig();
  public readonly state = injectColorAreaThumbState();

  public constructor() {
    classes(() =>
      mgnpColorAreaThumbVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
