import { Directive } from '@angular/core';
import { NgpFormControl } from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpFormControl]',
  standalone: true,
  host: {
    class: 'mgnp-form-control mgnp-c-form-control',
    'data-mgnp-form-control': '',
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
