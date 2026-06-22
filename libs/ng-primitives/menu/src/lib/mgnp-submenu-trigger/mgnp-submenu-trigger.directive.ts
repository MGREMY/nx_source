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
    class: 'mgnp-submenu-trigger mgnp-c-submenu-trigger',
    'data-mgnp-submenu-trigger': '',
  },
  hostDirectives: [
    {
      directive: NgpSubmenuTrigger,
      inputs: [
        'ngpSubmenuTrigger:mgnpSubmenuTrigger',
        'ngpSubmenuTriggerDisabled:mgnpSubmenuTriggerDisabled',
        'ngpSubmenuTriggerPlacement:mgnpSubmenuTriggerPlacement',
        'ngpSubmenuTriggerOffset:mgnpSubmenuTriggerOffset',
        'ngpSubmenuTriggerFlip:mgnpSubmenuTriggerFlip',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpSubmenuTrigger',
})
export class MgnpSubmenuTrigger {
  protected readonly state = injectSubmenuTriggerState();
}
