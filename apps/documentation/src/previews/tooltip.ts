import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpTooltip, MgnpTooltipTrigger } from '@mgremy/ng-primitives/tooltip';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton, MgnpTooltip, MgnpTooltipTrigger],
  template: `
    <button mgnpButton [mgnpTooltipTrigger]="tooltip">Hover me</button>

    <ng-template #tooltip>
      <div mgnpTooltip>Tooltip content</div>
    </ng-template>
  `,
})
export default class Tooltip {}
