import { Directive } from '@angular/core';
import {
  injectMenuItemCheckboxState,
  NgpMenuItemCheckbox,
  provideMenuItemCheckboxState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemCheckbox]',
  standalone: true,
  providers: [provideMenuItemCheckboxState()],
  host: {
    class: 'mgnp-menu-item-checkbox mgnp-c-menu-item-checkbox',
    'data-mgnp-menu-item-checkbox': '',
  },
  hostDirectives: [
    {
      directive: NgpMenuItemCheckbox,
      inputs: ['ngpMenuItemCheckboxChecked:checked', 'ngpMenuItemCheckboxDisabled:disabled'],
      outputs: ['ngpMenuItemCheckboxCheckedChange:checkedChange'],
    },
  ],
  exportAs: 'mgnpMenuItemCheckbox',
})
export class MgnpMenuItemCheckbox {
  protected readonly state = injectMenuItemCheckboxState();
}
