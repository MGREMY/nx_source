import {
  Color,
  MgnpColorField,
  MgnpColorSwatch,
  MgnpColorWheel,
  MgnpColorWheelThumb,
} from '@mgremy/ng-primitives/color-picker';

import { Component, signal } from '@angular/core';

@Component({
  imports: [MgnpColorField, MgnpColorWheel, MgnpColorWheelThumb, MgnpColorSwatch],
  template: `
    <div class="flex flex-col items-center gap-4 justify-self-center">
      <div mgnpColorWheel [(mgnpColorWheelValue)]="selectedColor">
        <div mgnpColorWheelThumb></div>
      </div>

      <div class="flex flex-row gap-4 items-center">
        <div [mgnpColorSwatch]="selectedColor()"></div>
        <input mgnpColorField aria-label="Hex" />
      </div>
    </div>
  `,
})
export default class WheelSelectorExample {
  readonly selectedColor = signal<Color>(Color.parse('#00a6f4'));
}
