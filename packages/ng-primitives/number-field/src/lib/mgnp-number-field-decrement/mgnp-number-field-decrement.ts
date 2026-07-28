import { MgnpNumberField } from '../mgnp-number-field/mgnp-number-field';

import { Directive, inject } from '@angular/core';
import {
  injectNumberFieldDecrementState,
  NgpNumberFieldDecrement,
  provideNumberFieldDecrementState,
} from 'ng-primitives/number-field';

@Directive({
  selector: '[mgnpNumberFieldDecrement]',
  providers: [provideNumberFieldDecrementState()],
  host: {
    class: 'mgnp-number-field-decrement mgnp-c-number-field-decrement',
    'data-mgnp-number-field-decrement': '',
    '[attr.data-mgnp-number-field-decrement-color]': 'numberField.color()',
  },
  hostDirectives: [
    {
      directive: NgpNumberFieldDecrement,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpNumberFieldDecrement',
})
export class MgnpNumberFieldDecrement {
  protected readonly numberField = inject(MgnpNumberField);

  readonly state = injectNumberFieldDecrementState();
}
