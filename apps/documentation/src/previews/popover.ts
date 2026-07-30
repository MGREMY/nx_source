import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpPopover, MgnpPopoverTrigger } from '@mgremy/ng-primitives/popover';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpPopover, MgnpPopoverTrigger, MgnpButton],
  template: `
    <div class="grid grid-rows-2 gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span class="place-self-center">{{ color }}</span>
        <button
          class="place-self-center"
          mgnpButton
          [aria-label]="'Open ' + color + ' popover'"
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
