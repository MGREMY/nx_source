import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpCheckbox],
  template: `
    <div
      class="grid grid-cols-[max-content_minmax(max-content,1fr)_minmax(max-content,1fr)] gap-x-4 gap-y-2 items-center w-full">
      <span></span>
      <span></span>
      <span class="justify-self-center">Indeterminate</span>
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <span class="justify-self-center" mgnpCheckbox [color]="color"></span>
        <span class="justify-self-center" mgnpCheckbox mgnpCheckboxIndeterminate [color]="color"></span>
      }
    </div>
  `,
})
export default class Checkbox {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
