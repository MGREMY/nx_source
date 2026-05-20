import { Directive } from '@angular/core';
import { NgpToast } from 'ng-primitives/toast';

@Directive({
  selector: '[mgnpToast]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-toast',
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
