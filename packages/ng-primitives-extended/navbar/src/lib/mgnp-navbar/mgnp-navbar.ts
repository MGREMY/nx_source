import { PropertyType } from '@mgremy/ng-primitives';

import { booleanAttribute, Directive, input } from '@angular/core';

export type MgnpNavbarColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpNavbar], nav[mgnpNavbar]',
  providers: [],
  host: {
    'data-mgnp-navbar': '',
    class: 'mgnp-navbar mgnp-c-navbar',
    '[attr.data-mgnp-navbar-color]': 'color()',
    '[attr.data-mgnp-navbar-is-always-open]': 'isAlwaysOpen() === true ? true : null',
  },
  hostDirectives: [],
  exportAs: 'mgnpNavbar',
})
export class MgnpNavbar {
  readonly color = input<MgnpNavbarColor>('ui');
  readonly isAlwaysOpen = input<unknown, boolean>(false, { transform: booleanAttribute });
}
