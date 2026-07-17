import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import {
  injectFormFieldState,
  NgpFormField,
  provideFormFieldState,
} from 'ng-primitives/form-field';

export type MgnpFormFieldColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpFormField]',
  providers: [provideFormFieldState()],
  host: {
    class: 'mgnp-form-field mgnp-c-form-field',
    'data-mgnp-form-field': '',
    '[attr.data-mgnp-form-field-color]': 'color()',
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

  readonly color = input<MgnpFormFieldColor>('ui');
}
