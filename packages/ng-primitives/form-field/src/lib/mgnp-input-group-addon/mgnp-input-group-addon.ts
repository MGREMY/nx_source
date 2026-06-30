import { Directive } from '@angular/core';

@Directive({
  selector: '[mgnpInputGroupAddon]',
  providers: [],
  host: {
    class: 'mgnp-input-group-addon mgnp-c-input-group-addon',
    'data-mgnp-input-group-addon': '',
  },
  hostDirectives: [],
  exportAs: 'mgnpInputGroupAddon',
})
export class MgnpInputGroupAddon {}
