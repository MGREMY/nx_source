import { Directive } from '@angular/core';
import {
  injectSubmenuTriggerState,
  NgpSubmenuTrigger,
  provideSubmenuTriggerState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpSubmenuTrigger]',
  standalone: true,
  providers: [provideSubmenuTriggerState()],
  host: {
    'data-mgnp-component': 'mgnp-submenu-trigger',
  },
  hostDirectives: [
    {
      directive: NgpSubmenuTrigger,
      inputs: [
        'ngpSubmenuTrigger:mgnpSubmenuTrigger',
        'ngpSubmenuTriggerDisabled:disabled',
        'ngpSubmenuTriggerPlacement:placement',
        'ngpSubmenuTriggerOffset:offset',
        'ngpSubmenuTriggerFlip:flip',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpSubmenuTrigger',
})
export class MgnpSubmenuTrigger {
  protected readonly state = injectSubmenuTriggerState();
}
