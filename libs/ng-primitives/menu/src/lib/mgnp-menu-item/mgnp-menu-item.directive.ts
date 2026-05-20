import { Directive } from '@angular/core';
import { injectMenuItemState, NgpMenuItem, provideMenuItemState } from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItem]',
  standalone: true,
  providers: [provideMenuItemState()],
  host: {
    'data-mgnp-component': 'mgnp-menu-item',
  },
  hostDirectives: [
    {
      directive: NgpMenuItem,
      inputs: ['ngpMenuItemDisabled:disabled', 'ngpMenuItemCloseOnSelect:closeOnSelect'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenuItem',
})
export class MgnpMenuItem {
  protected readonly state = injectMenuItemState();
}
