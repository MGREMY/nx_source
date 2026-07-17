import { MgnpFormField } from '../mgnp-form-field/mgnp-form-field';

import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[mgnpInputGroupAddon]',
  providers: [],
  host: {
    class: 'mgnp-input-group-addon mgnp-c-input-group-addon',
    'data-mgnp-input-group-addon': '',
    '[attr.data-mgnp-input-group-addon-color]': 'formField.color()',
  },
  hostDirectives: [],
  exportAs: 'mgnpInputGroupAddon',
})
export class MgnpInputGroupAddon {
  protected readonly formField = inject(MgnpFormField);
}
