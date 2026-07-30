import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpSwitch, MgnpSwitchThumb],
  template: `
    <div class="grid grid-rows-2 gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span class="place-self-center">{{ color }}</span>
        <button class="place-self-center" mgnpSwitch [color]="color">
          <span mgnpSwitchThumb></span>
        </button>
      }
    </div>
  `,
})
export default class Switch {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
