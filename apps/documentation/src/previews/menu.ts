import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpMenu, MgnpMenuItem, MgnpMenuTrigger } from '@mgremy/ng-primitives/menu';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpMenu, MgnpMenuItem, MgnpMenuTrigger, MgnpButton],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <button
          class="max-w-1/2 justify-self-center"
          mgnpButton
          [aria-label]="'Open' + color + 'menu'"
          [color]="color"
          [mgnpMenuTrigger]="menu">
          Open menu
        </button>

        <ng-template #menu>
          <div mgnpMenu [color]="color">
            <button mgnpMenuItem>Item 1</button>
            <button mgnpMenuItem>Item 2</button>
            <button mgnpMenuItem>Item 3</button>
          </div>
        </ng-template>
      }
    </div>
  `,
})
export default class Menu {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
