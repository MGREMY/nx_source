import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import { injectColorAreaState, NgpColorArea, provideColorAreaState } from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorArea]',
  providers: [provideColorAreaState()],
  host: {
    class: 'mgnp-color-area mgnp-c-color-area',
    'data-mgnp-color-area': '',
    '[attr.data-mgnp-color-area-color]': 'colorPicker?.color() ?? null',
  },
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
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorAreaState();
}
