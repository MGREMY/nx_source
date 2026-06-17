import { Directive } from '@angular/core';

@Directive({
  selector: '[mgnpInputGroup]',
  standalone: true,
  providers: [],
  host: {
    'data-mgnp-component': 'mgnp-input-group',
  },
  hostDirectives: [],
  exportAs: 'mgnpInputGroup',
})
export class MgnpInputGroup {}
