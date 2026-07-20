import { MgnpMenu } from '../mgnp-menu/mgnp-menu';

import { Directive, inject } from '@angular/core';
import {
  injectSubmenuTriggerState,
  NgpSubmenuTrigger,
  provideSubmenuTriggerState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpSubmenuTrigger]',
  providers: [provideSubmenuTriggerState()],
  host: {
    class: 'mgnp-submenu-trigger mgnp-c-submenu-trigger',
    'data-mgnp-submenu-trigger': '',
    '[attr.data-mgnp-submenu-trigger-color]': 'menu.color()',
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
  protected readonly menu = inject(MgnpMenu);
}
