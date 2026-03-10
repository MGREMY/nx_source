import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpTooltip } from '@mgremy/ng-primitives/tooltip';

import { Component } from '@angular/core';
import { NgpTooltip, NgpTooltipTrigger } from 'ng-primitives/tooltip';

@Component({
  imports: [NgpTooltipTrigger, NgpTooltip, MgnpButton, MgnpTooltip],
  template: `
    <button [ngpTooltipTrigger]="tooltip" mgnpButton>Hover me</button>

    <ng-template #tooltip>
      <div ngpTooltip mgnpTooltip>Tooltip content</div>
    </ng-template>
  `,
})
export default class ButtonExample {}
