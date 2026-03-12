import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpMenu, MgnpMenuItem } from '@mgremy/ng-primitives/menu';

import { Component } from '@angular/core';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  imports: [NgpMenu, NgpMenuTrigger, NgpMenuItem, MgnpButton, MgnpMenu, MgnpMenuItem],
  template: `
    <button [ngpMenuTrigger]="menu" mgnpButton>Open menu</button>

    <ng-template #menu>
      <div ngpMenu mgnpMenu>
        <button ngpMenuItem mgnpMenuItem>Item 1</button>
        <button ngpMenuItem mgnpMenuItem>Item 2</button>
        <button ngpMenuItem mgnpMenuItem>Item 3</button>
      </div>
    </ng-template>
  `,
})
export default class ButtonExample {}
