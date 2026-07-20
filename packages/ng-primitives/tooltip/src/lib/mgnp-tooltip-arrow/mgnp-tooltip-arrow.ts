import { MgnpTooltip } from '../mgnp-tooltip/mgnp-tooltip';

import { Directive, inject } from '@angular/core';
import {
  injectTooltipArrowState,
  NgpTooltipArrow,
  provideTooltipArrowState,
} from 'ng-primitives/tooltip';

@Directive({
  selector: '[mgnpTooltipArrow]',
  providers: [provideTooltipArrowState()],
  host: {
    class: 'mgnp-tooltip-arrow mgnp-c-tooltip-arrow',
    'data-mgnp-tooltip-arrow': '',
    '[attr.data-mgnp-tooltip-arrow-color]': 'tooltip.color()',
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
  protected readonly tooltip = inject(MgnpTooltip);
}
