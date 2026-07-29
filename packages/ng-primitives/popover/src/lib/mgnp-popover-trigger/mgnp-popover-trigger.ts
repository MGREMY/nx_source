import { Directive } from '@angular/core';
import {
  injectPopoverTriggerState,
  NgpPopoverTrigger,
  providePopoverTriggerState,
} from 'ng-primitives/popover';

@Directive({
  selector: '[mgnpPopoverTrigger]',
  providers: [providePopoverTriggerState()],
  host: {
    class: 'mgnp-popover-trigger mgnp-c-popover-trigger',
    'data-mgnp-popover-trigger': '',
  },
  hostDirectives: [
    {
      directive: NgpPopoverTrigger,
      inputs: [
        'ngpPopoverTrigger:mgnpPopoverTrigger',
        'ngpPopoverTriggerDisabled:mgnpPopoverTriggerDisabled',
        'ngpPopoverTriggerPlacement:mgnpPopoverTriggerPlacement',
        'ngpPopoverTriggerOffset:mgnpPopoverTriggerOffset',
        'ngpPopoverTriggerShowDelay:mgnpPopoverTriggerShowDelay',
        'ngpPopoverTriggerHideDelay:mgnpPopoverTriggerHideDelay',
        'ngpPopoverTriggerFlip:mgnpPopoverTriggerFlip',
        'ngpPopoverTriggerShift:mgnpPopoverTriggerShift',
        'ngpPopoverTriggerContainer:mgnpPopoverTriggerContainer',
        'ngpPopoverTriggerCloseOnOutsideClick:mgnpPopoverTriggerCloseOnOutsideClick',
        'ngpPopoverTriggerCloseOnEscape:mgnpPopoverTriggerCloseOnEscape',
        'ngpPopoverTriggerScrollBehavior:mgnpPopoverTriggerScrollBehavior',
        'ngpPopoverTriggerContext:mgnpPopoverTriggerContext',
        'ngpPopoverTriggerAnchor:mgnpPopoverTriggerAnchor',
        'ngpPopoverTriggerTrackPosition:mgnpPopoverTriggerTrackPosition',
        'ngpPopoverTriggerCooldown:mgnpPopoverTriggerCooldown',
      ],
      outputs: ['ngpPopoverTriggerOpenChange:mgnpPopoverTriggerOpenChange'],
    },
  ],
  exportAs: 'mgnpPopoverTrigger',
})
export class MgnpPopoverTrigger {
  readonly state = injectPopoverTriggerState();
}
