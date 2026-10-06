import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { injectColorAreaState, NgpColorArea, provideColorAreaState } from 'ng-primitives/color';

export type MgnpColorAreaCva = MgnpColorPickerCva;

export const [mgnpColorAreaVariants, provideMgnpColorAreaConfig, injectMgnpColorAreaConfig] =
  createMgnpComponent<MgnpColorAreaCva>('color-area', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorArea]',
  providers: [provideColorAreaState()],
  hostDirectives: [
    {
      directive: NgpColorArea,
      inputs: [
        'ngpColorAreaValue:mgnpColorAreaValue',
        'ngpColorAreaDefaultValue:mgnpColorAreaDefaultValue',
        'ngpColorAreaXChannel:mgnpColorAreaXChannel',
        'ngpColorAreaYChannel:mgnpColorAreaYChannel',
        'ngpColorAreaColorSpace:mgnpColorAreaColorSpace',
        'ngpColorAreaDisabled:mgnpColorAreaDisabled',
      ],
      outputs: ['ngpColorAreaValueChange:mgnpColorAreaValueChange'],
    },
  ],
  exportAs: 'mgnpColorArea',
})
export class MgnpColorArea {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorAreaConfig();
  public readonly state = injectColorAreaState();

  public constructor() {
    classes(() =>
      mgnpColorAreaVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
