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
    'data-mgnp-component': 'mgnp-tooltip-arrow',
  },
  hostDirectives: [
    {
      directive: NgpTooltipArrow,
      inputs: ['ngpTooltipArrowPadding:padding'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpTooltipArrow',
})
export class MgnpTooltipArrow {
  protected readonly state = injectTooltipArrowState();
}
