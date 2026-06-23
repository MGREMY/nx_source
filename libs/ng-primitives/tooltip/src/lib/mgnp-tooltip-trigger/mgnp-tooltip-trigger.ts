import { Directive } from '@angular/core';
import {
  injectTooltipTriggerState,
  NgpTooltipTrigger,
  provideTooltipTriggerState,
} from 'ng-primitives/tooltip';

@Directive({
  selector: '[mgnpTooltipTrigger]',
  standalone: true,
  providers: [provideTooltipTriggerState()],
  host: {
    class: 'mgnp-tooltip-trigger mgnp-c-tooltip-trigger',
    'data-mgnp-tooltip-trigger': '',
  },
  hostDirectives: [
    {
      directive: NgpTooltipTrigger,
      inputs: [
        'ngpTooltipTrigger:mgnpTooltipTrigger',
        'ngpTooltipTriggerDisabled:mgnpTooltipTriggerDisabled',
        'ngpTooltipTriggerPlacement:mgnpTooltipTriggerPlacement',
        'ngpTooltipTriggerOffset:mgnpTooltipTriggerOffset',
        'ngpTooltipTriggerShowDelay:mgnpTooltipTriggerShowDelay',
        'ngpTooltipTriggerHideDelay:mgnpTooltipTriggerHideDelay',
        'ngpTooltipTriggerFlip:mgnpTooltipTriggerFlip',
        'ngpTooltipTriggerShift:mgnpTooltipTriggerShift',
        'ngpTooltipTriggerContainer:mgnpTooltipTriggerContainer',
        'ngpTooltipTriggerShowOnOverflow:mgnpTooltipTriggerShowOnOverflow',
        'ngpTooltipTriggerAnchor:mgnpTooltipTriggerAnchor',
        'ngpTooltipTriggerContext:mgnpTooltipTriggerContext',
        'ngpTooltipTriggerUseTextContent:mgnpTooltipTriggerUseTextContent',
        'ngpTooltipTriggerTrackPosition:mgnpTooltipTriggerTrackPosition',
        'ngpTooltipTriggerScrollBehavior:mgnpTooltipTriggerScrollBehavior',
        'ngpTooltipTriggerCooldown:mgnpTooltipTriggerCooldown',
        'ngpTooltipTriggerHoverableContent:mgnpTooltipTriggerHoverableContent',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpTooltipTrigger',
})
export class MgnpTooltipTrigger {
  protected readonly state = injectTooltipTriggerState();
}
