import { MgnpMenu } from '../mgnp-menu/mgnp-menu';

import { Directive, inject } from '@angular/core';
import {
  injectMenuItemCheckboxState,
  NgpMenuItemCheckbox,
  provideMenuItemCheckboxState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemCheckbox]',
  providers: [provideMenuItemCheckboxState()],
  host: {
    class: 'mgnp-menu-item-checkbox mgnp-c-menu-item-checkbox',
    'data-mgnp-menu-item-checkbox': '',
    '[attr.data-mgnp-menu-item-checkbox-color]': 'menu.color()',
  },
  hostDirectives: [
    {
      directive: NgpMenuItemCheckbox,
      inputs: [
        'ngpMenuItemCheckboxChecked:mgnpMenuItemCheckboxchecked',
        'ngpMenuItemCheckboxDisabled:mgnpMenuItemCheckboxDisabled',
      ],
      outputs: ['ngpMenuItemCheckboxCheckedChange:mgnpMenuItemCheckboxCheckedChange'],
    },
  ],
  exportAs: 'mgnpMenuItemCheckbox',
})
export class MgnpMenuItemCheckbox {
  protected readonly state = injectMenuItemCheckboxState();
  protected readonly menu = inject(MgnpMenu);
}
