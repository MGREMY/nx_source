import { Directive } from '@angular/core';

@Directive({
  selector: '[ngpError][mgnpError]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-error',
  },
})
export class MgnpError {}
