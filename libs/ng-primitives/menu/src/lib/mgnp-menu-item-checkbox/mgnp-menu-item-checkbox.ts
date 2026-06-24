import { Directive } from '@angular/core';
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
}
