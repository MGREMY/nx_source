import { Directive } from '@angular/core';
import {
  injectSwitchThumbState,
  NgpSwitchThumb,
  provideSwitchThumbState,
} from 'ng-primitives/switch';

@Directive({
  selector: '[mgnpSwitchThumb]',
  standalone: true,
  providers: [provideSwitchThumbState()],
  host: {
    'data-mgnp-component': 'mgnp-switch-thumb',
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
}
