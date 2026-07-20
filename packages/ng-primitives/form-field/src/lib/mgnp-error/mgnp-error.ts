import { MgnpFormField } from '../mgnp-form-field/mgnp-form-field';

import { Directive, inject } from '@angular/core';
import { injectErrorState, NgpError, provideErrorState } from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpError]',
  providers: [provideErrorState()],
  host: {
    class: 'mgnp-error mgnp-c-error',
    'data-mgnp-error': '',
    '[attr.data-mgnp-error-color]': 'formField.color()',
  },
  hostDirectives: [
    {
      directive: NgpError,
      inputs: ['ngpErrorValidator:validator'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpError',
})
export class MgnpError {
  protected readonly state = injectErrorState();
  protected readonly formField = inject(MgnpFormField);
}
