import { Directive } from '@angular/core';

@Directive({
  selector: '[ngpDescription][mgnpDescription]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-description',
  },
})
export class MgnpDescription {}
