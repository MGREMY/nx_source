import { Directive } from '@angular/core';

@Directive({
  selector: '[mgnpInputGroup]',
  standalone: true,
  providers: [],
  host: {
    class: 'mgnp-input-group mgnp-c-input-group',
    'data-mgnp-input-group': '',
  },
  hostDirectives: [],
  exportAs: 'mgnpInputGroup',
})
export class MgnpInputGroup {}
