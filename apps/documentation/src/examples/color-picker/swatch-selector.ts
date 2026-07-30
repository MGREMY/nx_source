import { Color, MgnpColorSwatchPicker, MgnpColorSwatchPickerItem } from '@mgremy/ng-primitives/color-picker';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpColorSwatchPicker, MgnpColorSwatchPickerItem],
  template: `
    <div
      class="justify-self-center"
      mgnpColorSwatchPicker
      [mgnpColorSwatchPickerDefaultValue]="c"
      aria-label="Color swatches">
      @for (color of _colors; track $index) {
        <button [mgnpColorSwatchPickerItem]="color" [aria-label]="color.toHex()"></button>
      }
    </div>
  `,
})
export default class SwatchSelectorExample {
  readonly _colors: Color[] = [
    '#f01e2b',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#00a6f4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#111827',
  ].map((hex) => Color.parse(hex));
  readonly c = Color.parse('#00a6f4');
}
