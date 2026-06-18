import { Directive } from '@angular/core';
import {
  injectMenuItemRadioGroupState,
  NgpMenuItemRadioGroup,
  provideMenuItemRadioGroupState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemRadioGroup]',
  standalone: true,
  providers: [provideMenuItemRadioGroupState()],
  host: {
    class: 'mgnp-menu-item-radio-group mgnp-c-menu-item-radio-group',
    'data-mgnp-menu-item-radio-group': '',
  },
  hostDirectives: [
    {
      directive: NgpMenuItemRadioGroup,
      inputs: ['ngpMenuItemRadioGroupValue:value'],
      outputs: ['ngpMenuItemRadioGroupValueChange:valueChange'],
    },
  ],
  exportAs: 'mgnpMenuItemRadioGroup',
})
export class MgnpMenuItemRadioGroup {
  protected readonly state = injectMenuItemRadioGroupState();
}
