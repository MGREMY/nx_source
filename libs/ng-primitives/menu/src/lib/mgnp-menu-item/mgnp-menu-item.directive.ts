import { Directive } from '@angular/core';
import { injectMenuItemState, NgpMenuItem, provideMenuItemState } from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItem]',
  standalone: true,
  providers: [provideMenuItemState()],
  host: {
    class: 'mgnp-menu-item mgnp-c-menu-item',
    'data-mgnp-menu-item': '',
  },
  hostDirectives: [
    {
      directive: NgpMenuItem,
      inputs: [
        'ngpMenuItemDisabled:mgnpMenuItemDisabled',
        'ngpMenuItemCloseOnSelect:mgnpMenuItemCloseOnSelect',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenuItem',
})
export class MgnpMenuItem {
  protected readonly state = injectMenuItemState();
}
