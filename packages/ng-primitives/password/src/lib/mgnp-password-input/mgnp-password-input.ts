import { Directive } from '@angular/core';
import {
  injectPasswordInputState,
  NgpPasswordInput,
  providePasswordInputState,
} from 'ng-primitives/password';

@Directive({
  selector: '[mgnpPasswordInput]',
  providers: [providePasswordInputState()],
  host: {
    class: 'mgnp-password-input mgnp-c-password-input',
    'data-mgnp-password-input': '',
  },
  hostDirectives: [
    {
      directive: NgpPasswordInput,
      inputs: [
        'disabled:disabled',
        'ngpPasswordInputIgnorePasswordManagers:mgnpPasswordInputIgnorePasswordManagers',
      ],
    },
  ],
  exportAs: 'mgnpPasswordInput',
})
export class MgnpPasswordInput {
  readonly state = injectPasswordInputState();
}
