import { Directive } from '@angular/core';
import { injectSwitchState, NgpSwitch, provideSwitchState } from 'ng-primitives/switch';

@Directive({
  selector: '[mgnpSwitch]',
  standalone: true,
  providers: [provideSwitchState()],
  host: {
    'data-mgnp-component': 'mgnp-switch',
  },
  hostDirectives: [
    {
      directive: NgpSwitch,
      inputs: ['ngpSwitchChecked:checked', 'ngpSwitchDisabled:disabled'],
      outputs: ['ngpSwitchCheckedChange:checkedChange'],
    },
  ],
  exportAs: 'mgnpSwitch',
})
export class MgnpSwitch {
  protected readonly state = injectSwitchState();
}
