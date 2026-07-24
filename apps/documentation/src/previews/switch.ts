import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpSwitch, MgnpSwitchThumb],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-2 items-center w-full">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <button class="justify-self-center" mgnpSwitch [color]="color">
          <span mgnpSwitchThumb></span>
        </button>
      }
    </div>
  `,
})
export default class Switch {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
