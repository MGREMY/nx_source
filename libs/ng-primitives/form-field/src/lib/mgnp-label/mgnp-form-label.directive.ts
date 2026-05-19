import { Directive } from '@angular/core';

@Directive({
  selector: '[ngpLabel][mgnpLabel]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-label',
  },
})
export class MgnpLabel {}
