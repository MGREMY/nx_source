import { MgnpMenu } from '../mgnp-menu/mgnp-menu';

import { Directive, inject } from '@angular/core';
import {
  injectMenuItemRadioState,
  NgpMenuItemRadio,
  provideMenuItemRadioState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemRadio]',
  providers: [provideMenuItemRadioState()],
  host: {
    class: 'mgnp-menu-item-radio mgnp-c-menu-item-radio',
    'data-mgnp-menu-item-radio': '',
    '[attr.data-mgnp-menu-item-radio-color]': 'menu.color()',
  },
  hostDirectives: [
    {
      directive: NgpMenuItemRadio,
      inputs: [
        'ngpMenuItemRadioValue:mgnpMenuItemRadioValue',
        'ngpMenuItemRadioDisabled:mgnpMenuItemRadioDisabled',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenuItemRadio',
})
export class MgnpMenuItemRadio {
  protected readonly state = injectMenuItemRadioState();
  protected readonly menu = inject(MgnpMenu);
}
