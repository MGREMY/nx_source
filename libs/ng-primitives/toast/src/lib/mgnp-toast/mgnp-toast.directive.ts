import { Directive } from '@angular/core';
import { NgpToast } from 'ng-primitives/toast';

@Directive({
  selector: '[mgnpToast]',
  standalone: true,
  host: {
    class: 'mgnp-toast',
    'data-mgnp-toast': '',
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
export class MgnpToast {}
