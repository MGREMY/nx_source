import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpMenu, MgnpMenuItem, MgnpMenuTrigger } from '@mgremy/ng-primitives/menu';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpMenu, MgnpMenuItem, MgnpMenuTrigger, MgnpButton],
  template: `
    <button mgnpButton [mgnpMenuTrigger]="menu">Open menu</button>

    <ng-template #menu>
      <div mgnpMenu>
        <button mgnpMenuItem>Item 1</button>
        <button mgnpMenuItem>Item 2</button>
        <button mgnpMenuItem>Item 3</button>
      </div>
    </ng-template>
  `,
})
export default class MenuExample {}
