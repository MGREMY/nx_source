import { Directive } from '@angular/core';

@Directive({
  selector: '[mgnpNavbar]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-navbar',
  },
})
export class MgnpNavbar {}
