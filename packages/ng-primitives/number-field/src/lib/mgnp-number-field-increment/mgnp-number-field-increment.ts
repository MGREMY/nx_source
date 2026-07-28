import { MgnpNumberField } from '../mgnp-number-field/mgnp-number-field';

import { Directive, inject } from '@angular/core';
import {
  injectNumberFieldIncrementState,
  NgpNumberFieldIncrement,
  provideNumberFieldIncrementState,
} from 'ng-primitives/number-field';

@Directive({
  selector: '[mgnpNumberFieldIncrement]',
  providers: [provideNumberFieldIncrementState()],
  host: {
    class: 'mgnp-number-field-increment mgnp-c-number-field-increment',
    'data-mgnp-number-field-increment': '',
    '[attr.data-mgnp-number-field-increment-color]': 'numberField.color()',
  },
  hostDirectives: [
    {
      directive: NgpNumberFieldIncrement,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpNumberFieldIncrement',
})
export class MgnpNumberFieldIncrement {
  protected readonly numberField = inject(MgnpNumberField);

  readonly state = injectNumberFieldIncrementState();
}
