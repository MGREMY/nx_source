import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpTooltip, MgnpTooltipTrigger } from '@mgremy/ng-primitives/tooltip';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton, MgnpTooltip, MgnpTooltipTrigger],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-2 items-center w-full">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <button class="justify-self-center" mgnpButton [color]="color" [mgnpTooltipTrigger]="tooltip">Hover me</button>

        <ng-template #tooltip>
          <div mgnpTooltip [color]="color">Tooltip content</div>
        </ng-template>
      }
    </div>
  `,
})
export default class Tooltip {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
