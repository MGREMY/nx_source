import { Directive } from '@angular/core';
import {
  injectMenuItemRadioState,
  NgpMenuItemRadio,
  provideMenuItemRadioState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemRadio]',
  standalone: true,
  providers: [provideMenuItemRadioState()],
  host: {
    class: 'mgnp-menu-item-radio mgnp-c-menu-item-radio',
    'data-mgnp-menu-item-radio': '',
  },
  hostDirectives: [
    {
      directive: NgpMenuItemRadio,
      inputs: ['ngpMenuItemRadioValue:value', 'ngpMenuItemRadioDisabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenuItemRadio',
})
export class MgnpMenuItemRadio {
  protected readonly state = injectMenuItemRadioState();
}
