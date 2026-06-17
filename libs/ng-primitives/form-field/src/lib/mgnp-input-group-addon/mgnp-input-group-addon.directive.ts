import { Directive } from '@angular/core';

@Directive({
  selector: '[mgnpInputGroupAddon]',
  standalone: true,
  providers: [],
  host: {
    'data-mgnp-component': 'mgnp-input-group-addon',
  },
  hostDirectives: [],
  exportAs: 'mgnpInputGroupAddon',
})
export class MgnpInputGroupAddon {}
