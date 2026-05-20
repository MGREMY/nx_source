import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpTooltip, MgnpTooltipArrow, MgnpTooltipTrigger } from '@mgremy/ng-primitives/tooltip';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton, MgnpTooltip, MgnpTooltipArrow, MgnpTooltipTrigger],
  template: `
    <button mgnpButton [mgnpTooltipTrigger]="tooltip">Hover me</button>

    <ng-template #tooltip>
      <div mgnpTooltip>
        Tooltip content
        <div mgnpTooltipArrow></div>
      </div>
    </ng-template>
  `,
})
export default class WithArrowExample {}
