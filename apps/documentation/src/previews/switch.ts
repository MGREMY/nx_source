import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpSwitch, MgnpSwitchThumb],
  template: `
    <div class="flex flex-col gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <button mgnpSwitch [color]="color">
          <span mgnpSwitchThumb></span>
        </button>
      }
    </div>
  `,
})
export default class Switch {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
