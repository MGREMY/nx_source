import { MgnpButton, MgnpButtonVariants } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton],
  template: `
    <p class="font-bold">Solid</p>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      @for (color of _colors; track $index) {
        <button mgnpButton [variant]="color">{{ color }}</button>
      }
    </div>
    <p class="font-bold">Disabled</p>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      @for (color of _colors; track $index) {
        <button mgnpButton disabled [variant]="color">{{ color }}</button>
      }
    </div>
  `,
  host: {
    class: 'flex! flex-col flex-wrap gap-4 items-center',
  },
})
export default class Button {
  readonly _colors = [
    'default',
    'ghost',
    'primary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
  ] as MgnpButtonVariants['variant'][];
}
