import { Directive } from '@angular/core';
import { injectPasswordState, NgpPassword, providePasswordState } from 'ng-primitives/password';

@Directive({
  selector: '[mgnpPassword]',
  providers: [providePasswordState()],
  host: {
    class: 'mgnp-password mgnp-c-password',
    'data-mgnp-password': '',
  },
  hostDirectives: [
    {
      directive: NgpPassword,
      inputs: [
        'ngpPasswordVisible:mgnpPasswordVisible',
        'ngpPasswordDefaultVisible:mgnpPasswordDefaultVisible',
      ],
      outputs: ['ngpPasswordVisibleChange:mgnpPasswordVisibleChange'],
    },
  ],
  exportAs: 'mgnpPassword',
})
export class MgnpPassword {
  readonly state = injectPasswordState();
}
