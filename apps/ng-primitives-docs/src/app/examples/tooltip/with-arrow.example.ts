import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpTooltip, MgnpTooltipArrow } from '@mgremy/ng-primitives/tooltip';

import { Component } from '@angular/core';
import { NgpTooltip, NgpTooltipArrow, NgpTooltipTrigger } from 'ng-primitives/tooltip';

@Component({
  imports: [NgpTooltipTrigger, NgpTooltip, NgpTooltipArrow, MgnpButton, MgnpTooltip, MgnpTooltipArrow],
  template: `
    <button [ngpTooltipTrigger]="tooltip" mgnpButton>Hover me</button>

    <ng-template #tooltip>
      <div ngpTooltip mgnpTooltip>
        Tooltip content
        <div ngpTooltipArrow mgnpTooltipArrow></div>
      </div>
    </ng-template>
  `,
})
export default class ButtonExample {}
