import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[mgnpNavbar], nav[mgnpNavbar]',
  standalone: true,
  providers: [],
  host: {
    'data-mgnp-component': 'mgnp-navbar',
    '[attr.data-is-always-open]': 'this.isAlwaysOpen() === true ? true : null',
  },
  hostDirectives: [],
  exportAs: 'mgnpNavbar',
})
export class MgnpNavbar {
  readonly isAlwaysOpen = input(false, { transform: booleanAttribute });
}
