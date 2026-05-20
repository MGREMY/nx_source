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
    'data-mgnp-component': 'mgnp-menu-item-radio',
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
