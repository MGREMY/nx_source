import { MgnpFormField } from '../mgnp-form-field/mgnp-form-field';

import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[mgnpInputGroup]',
  providers: [],
  host: {
    class: 'mgnp-input-group mgnp-c-input-group',
    'data-mgnp-input-group': '',
    '[attr.data-mgnp-input-group-color]': 'formField.color()',
  },
  hostDirectives: [],
  exportAs: 'mgnpInputGroup',
})
export class MgnpInputGroup {
  protected readonly formField = inject(MgnpFormField);
}
