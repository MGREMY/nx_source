import { Directive } from '@angular/core';
import {
  injectMenuTriggerState,
  NgpMenuTrigger,
  provideMenuTriggerState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuTrigger]',
  providers: [provideMenuTriggerState()],
  host: {
    class: 'mgnp-menu-trigger mgnp-c-menu-trigger',
    'data-mgnp-menu-trigger': '',
  },
  hostDirectives: [
    {
      directive: NgpMenuTrigger,
      inputs: [
        'ngpMenuTrigger:mgnpMenuTrigger',
        'ngpMenuTriggerDisabled:mgnpMenuTriggerDisabled',
        'ngpMenuTriggerPlacement:mgnpMenuTriggerPlacement',
        'ngpMenuTriggerOffset:mgnpMenuTriggerOffset',
        'ngpMenuTriggerFlip:mgnpMenuTriggerFlip',
        'ngpMenuTriggerShift:mgnpMenuTriggerShift',
        'ngpMenuTriggerContainer:mgnpMenuTriggerContainer',
        'ngpMenuTriggerScrollBehavior:mgnpMenuTriggerScrollBehavior',
        'ngpMenuTriggerCooldown:mgnpMenuTriggerCooldown',
        'ngpMenuTriggerContext:mgnpMenuTriggerContext',
        'ngpMenuTriggerOpenTriggers:mgnpMenuTriggerOpenTriggers',
        'ngpMenuTriggerShowDelay:mgnpMenuTriggerShowDelay',
        'ngpMenuTriggerHideDelay:mgnpMenuTriggerHideDelay',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenuTrigger',
})
export class MgnpMenuTrigger {
  protected readonly state = injectMenuTriggerState();
}
