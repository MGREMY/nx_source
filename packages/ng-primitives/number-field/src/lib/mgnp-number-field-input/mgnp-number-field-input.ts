import { MgnpNumberField } from '../mgnp-number-field/mgnp-number-field';

import { Directive, inject } from '@angular/core';
import {
  injectNumberFieldInputState,
  NgpNumberFieldInput,
  provideNumberFieldInputState,
} from 'ng-primitives/number-field';

@Directive({
  selector: '[mgnpNumberFieldInput]',
  providers: [provideNumberFieldInputState()],
  host: {
    class: 'mgnp-number-field-input mgnp-c-number-field-input',
    'data-mgnp-number-field-input': '',
    '[attr.data-mgnp-number-field-input-color]': 'numberField.color()',
  },
  hostDirectives: [
    {
      directive: NgpNumberFieldInput,
      inputs: ['ngpNumberFieldInputAllowWheelScrub:mgnpNumberFieldInputAllowWheelScrub'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpNumberFieldInput',
})
export class MgnpNumberFieldInput {
  protected readonly numberField = inject(MgnpNumberField);

  readonly state = injectNumberFieldInputState();
}
