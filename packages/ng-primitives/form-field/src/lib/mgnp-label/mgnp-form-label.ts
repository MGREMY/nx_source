import { MgnpFormField } from '../mgnp-form-field/mgnp-form-field';

import { Directive, inject } from '@angular/core';
import { injectLabelState, NgpLabel, provideLabelState } from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpLabel]',
  providers: [provideLabelState()],
  host: {
    class: 'mgnp-label mgnp-c-label',
    'data-mgnp-label': '',
    '[attr.data-mgnp-label-color]': 'formField.color()',
  },
  hostDirectives: [
    {
      directive: NgpLabel,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpLabel',
})
export class MgnpLabel {
  protected readonly state = injectLabelState();
  protected readonly formField = inject(MgnpFormField);
}
