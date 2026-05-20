import { Directive } from '@angular/core';
import {
  injectMenuTriggerState,
  NgpMenuTrigger,
  provideMenuTriggerState,
} from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuTrigger]',
  standalone: true,
  providers: [provideMenuTriggerState()],
  host: {
    'data-mgnp-component': 'mgnp-menu-trigger',
  },
  hostDirectives: [
    {
      directive: NgpMenuTrigger,
      inputs: [
        'ngpMenuTrigger:mgnpMenuTrigger',
        'ngpMenuTriggerDisabled:disabled',
        'ngpMenuTriggerPlacement:placement',
        'ngpMenuTriggerOffset:offset',
        'ngpMenuTriggerFlip:flip',
        'ngpMenuTriggerShift:shift',
        'ngpMenuTriggerContainer:container',
        'ngpMenuTriggerScrollBehavior:scrollBehavior',
        'ngpMenuTriggerCooldown:cooldown',
        'ngpMenuTriggerContext:context',
        'ngpMenuTriggerOpenTriggers:openTriggers',
        'ngpMenuTriggerShowDelay:showDelay',
        'ngpMenuTriggerHideDelay:hideDelay',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenuTrigger',
})
export class MgnpMenuTrigger {
  protected readonly state = injectMenuTriggerState();
}
