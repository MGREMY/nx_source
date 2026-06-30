import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[mgnpNavbar], nav[mgnpNavbar]',
  providers: [],
  host: {
    'data-mgnp-navbar': '',
    class: 'mgnp-navbar mgnp-c-navbar',
    '[attr.data-is-always-open]': 'isAlwaysOpen() === true ? true : null',
  },
  hostDirectives: [],
  exportAs: 'mgnpNavbar',
})
export class MgnpNavbar {
  readonly isAlwaysOpen = input(false, { transform: booleanAttribute });
}
