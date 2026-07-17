import { MgnpFormField } from '../mgnp-form-field/mgnp-form-field';

import { Directive, inject } from '@angular/core';
import {
  injectDescriptionState,
  NgpDescription,
  provideDescriptionState,
} from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpDescription]',
  providers: [provideDescriptionState()],
  host: {
    class: 'mgnp-description mgnp-c-description',
    'data-mgnp-description': '',
    '[attr.data-mgnp-description-color]': 'formField.color()',
  },
  hostDirectives: [
    {
      directive: NgpDescription,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDescription',
})
export class MgnpDescription {
  protected readonly state = injectDescriptionState();
  protected readonly formField = inject(MgnpFormField);
}
