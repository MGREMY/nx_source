import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import { injectColorWheelState, NgpColorWheel, provideColorWheelState } from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorWheel]',
  providers: [provideColorWheelState()],
  host: {
    class: 'mgnp-color-wheel mgnp-c-color-wheel',
    'data-mgnp-color-wheel': '',
    '[attr.data-mgnp-color-wheel-color]': 'colorPicker?.color() ?? null',
  },
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
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorWheelState();
}
