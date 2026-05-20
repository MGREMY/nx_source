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
    'data-mgnp-component': 'mgnp-menu-item-checkbox',
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
