import {
  Color,
  MgnpColorField,
  MgnpColorPicker,
  MgnpColorSwatch,
  MgnpColorWheel,
  MgnpColorWheelThumb,
} from '@mgremy/ng-primitives/color-picker';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpColorPicker, MgnpColorField, MgnpColorWheel, MgnpColorWheelThumb, MgnpColorSwatch],
  template: `
    <div mgnpColorPicker class="justify-self-center" [mgnpColorPickerDefaultValue]="c">
      <div mgnpColorWheel>
        <div mgnpColorWheelThumb></div>
      </div>

      <div class="flex flex-row gap-4 items-center">
        <div mgnpColorSwatch></div>
        <input mgnpColorField aria-label="Hex" />
      </div>
    </div>
  `,
})
export default class WheelSelectorExample {
  readonly c = Color.parse('#00a6f4');
}
