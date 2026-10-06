import { MgnpCheckbox, MgnpCheckboxCva } from '@mgremy/ng-primitives/checkbox';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpCheckbox],
  template: `
    <div
      class="grid grid-cols-[max-content_minmax(max-content,1fr)_minmax(max-content,1fr)] gap-x-4 gap-y-2 items-center w-full">
      <span></span>
      <span></span>
      <span class="justify-self-center">Indeterminate</span>
      @for (variant of _variants; track $index) {
        <span>{{ variant }}</span>
        <span class="justify-self-end" mgnpCheckbox [variant]="variant"></span>
        <span class="justify-self-center" mgnpCheckbox mgnpCheckboxIndeterminate [variant]="variant"></span>
      }
    </div>
  `,
})
export default class Checkbox {
  readonly _variants = [
    'default',
    'primary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
  ] as MgnpCheckboxCva['variant'][];
}
