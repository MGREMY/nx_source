import { Directive } from '@angular/core';
import { injectErrorState, NgpError, provideErrorState } from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpError]',
  standalone: true,
  providers: [provideErrorState()],
  host: {
    'data-mgnp-component': 'mgnp-error',
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
}
