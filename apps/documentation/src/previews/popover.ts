import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpPopover, MgnpPopoverTrigger } from '@mgremy/ng-primitives/popover';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpPopover, MgnpPopoverTrigger, MgnpButton],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <button
          class="max-w-1/2 justify-self-center"
          mgnpButton
          [aria-label]="'Open' + color + 'menu'"
          [color]="color"
          [mgnpPopoverTrigger]="popover">
          Open popover
        </button>

        <ng-template #popover>
          <div mgnpPopover [color]="color">
            <span>Popover content</span>
          </div>
        </ng-template>
      }
    </div>
  `,
})
export default class Popover {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
