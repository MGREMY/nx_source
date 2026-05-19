import { Directive } from '@angular/core';

@Directive({
  selector: '[ngpFormField][mgnpFormField]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-form-field',
  },
})
export class MgnpFormField {}
