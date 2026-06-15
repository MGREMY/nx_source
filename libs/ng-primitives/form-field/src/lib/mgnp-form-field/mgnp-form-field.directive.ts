import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import {
  injectFormFieldState,
  NgpFormField,
  provideFormFieldState,
} from 'ng-primitives/form-field';

export type MgnpFormFieldType = PropertyType<'control' | 'toggle'>;

@Directive({
  selector: '[mgnpFormField]',
  standalone: true,
  providers: [provideFormFieldState()],
  host: {
    'data-mgnp-component': 'mgnp-form-field',
    '[attr.data-type]': 'type()',
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

  readonly type = input<MgnpFormFieldType>('control');
}
