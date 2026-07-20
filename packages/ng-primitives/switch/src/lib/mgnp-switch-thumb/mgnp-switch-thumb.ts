import { MgnpSwitch } from '../mgnp-switch/mgnp-switch';

import { Directive, inject } from '@angular/core';
import {
  injectSwitchThumbState,
  NgpSwitchThumb,
  provideSwitchThumbState,
} from 'ng-primitives/switch';

@Directive({
  selector: '[mgnpSwitchThumb]',
  providers: [provideSwitchThumbState()],
  host: {
    class: 'mgnp-switch-thumb mgnp-c-switch-thumb',
    'data-mgnp-switch-thumb': '',
    '[attr.data-mgnp-switch-thumb-color]': 'switch.color()',
  },
  hostDirectives: [
    {
      directive: NgpSwitchThumb,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpSwitchThumb',
})
export class MgnpSwitchThumb {
  protected readonly state = injectSwitchThumbState();
  protected readonly switch = inject(MgnpSwitch);
}
