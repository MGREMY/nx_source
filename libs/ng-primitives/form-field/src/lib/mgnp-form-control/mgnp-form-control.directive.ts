import { Directive } from '@angular/core';
import { NgpFormControl } from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpFormControl]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-form-control',
  },
  hostDirectives: [
    {
      directive: NgpFormControl,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpFormControl',
})
export class MgnpFormControl {}
