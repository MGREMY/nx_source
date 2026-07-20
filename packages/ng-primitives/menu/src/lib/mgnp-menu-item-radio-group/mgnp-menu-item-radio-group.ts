import { MgnpMenu } from '../mgnp-menu/mgnp-menu';

import { Directive, inject } from '@angular/core';
import {
  injectMenuItemRadioGroupState,
  NgpMenuItemRadioGroup,
  provideMenuItemRadioGroupState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemRadioGroup]',
  providers: [provideMenuItemRadioGroupState()],
  host: {
    class: 'mgnp-menu-item-radio-group mgnp-c-menu-item-radio-group',
    'data-mgnp-menu-item-radio-group': '',
    '[attr.data-mgnp-menu-item-radio-group-color]': 'menu.color()',
  },
  hostDirectives: [
    {
      directive: NgpMenuItemRadioGroup,
      inputs: ['ngpMenuItemRadioGroupValue:mgnpMenuItemRadioGroupValue'],
      outputs: ['ngpMenuItemRadioGroupValueChange:mgnpMenuItemRadioGroupValueChange'],
    },
  ],
  exportAs: 'mgnpMenuItemRadioGroup',
})
export class MgnpMenuItemRadioGroup {
  protected readonly state = injectMenuItemRadioGroupState();
  protected readonly menu = inject(MgnpMenu);
}
