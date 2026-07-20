import { MgnpFormField } from '../mgnp-form-field/mgnp-form-field';

import { Directive, inject } from '@angular/core';
import { NgpFormControl } from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpFormControl]',
  host: {
    class: 'mgnp-form-control mgnp-c-form-control',
    'data-mgnp-form-control': '',
    '[attr.data-mgnp-form-control-color]': 'formField.color()',
  },
  hostDirectives: [
    {
      directive: NgpFormControl,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpFormControl',
})
export class MgnpFormControl {
  protected readonly formField = inject(MgnpFormField);
}
