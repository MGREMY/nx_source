import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { NgpToast } from 'ng-primitives/toast';

export type MgnpToastColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpToast]',
  host: {
    class: 'mgnp-toast mgnp-c-toast',
    'data-mgnp-toast': '',
    '[attr.data-mgnp-toast-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpToast,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpToast',
})
export class MgnpToast {
  readonly color = input<MgnpToastColor>('ui');
}
