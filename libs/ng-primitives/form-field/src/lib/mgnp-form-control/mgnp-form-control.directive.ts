import { Directive } from '@angular/core';

@Directive({
  selector: '[ngpFormControl][mgnpFormControl]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-form-control',
  },
})
export class MgnpFormControl {}
