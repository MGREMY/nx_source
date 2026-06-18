import { Directive } from '@angular/core';
import { injectInputState, NgpInput, provideInputState } from 'ng-primitives/input';

@Directive({
  selector: '[mgnpInput]',
  standalone: true,
  providers: [provideInputState()],
  host: {
    class: 'mgnp-input mgnp-c-input',
    'data-mgnp-input': '',
  },
  hostDirectives: [
    {
      directive: NgpInput,
      inputs: ['disabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpInput',
})
export class MgnpInput {
  protected readonly state = injectInputState();
}
