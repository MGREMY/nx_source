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
    'data-mgnp-component': 'mgnp-tooltip-trigger',
  },
  hostDirectives: [
    {
      directive: NgpTooltipTrigger,
      inputs: [
        'ngpTooltipTrigger:mgnpTooltipTrigger',
        'ngpTooltipTriggerDisabled:disabled',
        'ngpTooltipTriggerPlacement:placement',
        'ngpTooltipTriggerOffset:offset',
        'ngpTooltipTriggerShowDelay:showDelay',
        'ngpTooltipTriggerHideDelay:hideDelay',
        'ngpTooltipTriggerFlip:flip',
        'ngpTooltipTriggerShift:shift',
        'ngpTooltipTriggerContainer:container',
        'ngpTooltipTriggerShowOnOverflow:showOnOverflow',
        'ngpTooltipTriggerAnchor:anchor',
        'ngpTooltipTriggerContext:context',
        'ngpTooltipTriggerUseTextContent:useTextContent',
        'ngpTooltipTriggerTrackPosition:trackPosition',
        'ngpTooltipTriggerScrollBehavior:scrollBehavior',
        'ngpTooltipTriggerCooldown:cooldown',
        'ngpTooltipTriggerHoverableContent:hoverableContent',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpTooltipTrigger',
})
export class MgnpTooltipTrigger {
  protected readonly state = injectTooltipTriggerState();
}
