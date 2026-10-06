import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { injectColorFieldState, NgpColorField, provideColorFieldState } from 'ng-primitives/color';

export type MgnpColorFieldCva = MgnpColorPickerCva;

export const [mgnpColorFieldVariants, provideMgnpColorFieldConfig, injectMgnpColorFieldConfig] =
  createMgnpComponent<MgnpColorFieldCva>('color-field', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorField]',
  providers: [provideColorFieldState()],
  hostDirectives: [
    {
      directive: NgpColorField,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorField',
})
export class MgnpColorField {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorFieldConfig();
  public readonly state = injectColorFieldState();

  public constructor() {
    classes(() =>
      mgnpColorFieldVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
