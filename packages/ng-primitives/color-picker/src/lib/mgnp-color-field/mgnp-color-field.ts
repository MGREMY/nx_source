import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';

import { Directive, inject } from '@angular/core';
import { injectColorFieldState, NgpColorField, provideColorFieldState } from 'ng-primitives/color';

@Directive({
  selector: '[mgnpColorField]',
  providers: [provideColorFieldState()],
  host: {
    class: 'mgnp-color-field mgnp-c-color-field',
    'data-mgnp-color-field': '',
    '[attr.data-mgnp-color-field-color]': 'colorPicker?.color() ?? null',
  },
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
  protected readonly colorPicker = inject(MgnpColorPicker, { optional: true });

  readonly state = injectColorFieldState();
}
