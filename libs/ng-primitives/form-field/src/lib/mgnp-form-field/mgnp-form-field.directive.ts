import { Directive } from '@angular/core';
import {
  injectFormFieldState,
  NgpFormField,
  provideFormFieldState,
} from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpFormField]',
  standalone: true,
  providers: [provideFormFieldState()],
  host: {
    'data-mgnp-component': 'mgnp-form-field',
  },
  hostDirectives: [
    {
      directive: NgpFormField,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpFormField',
})
export class MgnpFormField {
  protected readonly state = injectFormFieldState();
}
