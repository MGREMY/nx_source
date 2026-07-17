import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectInputState, NgpInput, provideInputState } from 'ng-primitives/input';

export type MgnpInputColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpInput]',
  providers: [provideInputState()],
  host: {
    class: 'mgnp-input mgnp-c-input',
    'data-mgnp-input': '',
    '[attr.data-mgnp-input-color]': 'color()',
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

  readonly color = input<MgnpInputColor>('ui');
}
