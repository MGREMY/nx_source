import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectColorSwatchState,
  NgpColorSwatch,
  provideColorSwatchState,
} from 'ng-primitives/color';

export type MgnpColorSwatchCva = MgnpColorPickerCva;

export const [mgnpColorSwatchVariants, provideMgnpColorSwatchConfig, injectMgnpColorSwatchConfig] =
  createMgnpComponent<MgnpColorSwatchCva>('color-swatch', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorSwatch]',
  providers: [provideColorSwatchState()],
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
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSwatchConfig();
  public readonly state = injectColorSwatchState();

  public constructor() {
    classes(() =>
      mgnpColorSwatchVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
