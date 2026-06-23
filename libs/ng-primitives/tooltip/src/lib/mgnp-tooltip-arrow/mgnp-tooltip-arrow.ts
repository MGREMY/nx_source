import { Directive } from '@angular/core';
import {
  injectTooltipArrowState,
  NgpTooltipArrow,
  provideTooltipArrowState,
} from 'ng-primitives/tooltip';

@Directive({
  selector: '[mgnpTooltipArrow]',
  standalone: true,
  providers: [provideTooltipArrowState()],
  host: {
    class: 'mgnp-tooltip-arrow mgnp-c-tooltip-arrow',
    'data-mgnp-tooltip-arrow': '',
  },
  hostDirectives: [
    {
      directive: NgpTooltipArrow,
      inputs: ['ngpTooltipArrowPadding:mgnpTooltipArrowPadding'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpTooltipArrow',
})
export class MgnpTooltipArrow {
  protected readonly state = injectTooltipArrowState();
}
