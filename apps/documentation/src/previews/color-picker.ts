import {
  Color,
  MgnpColorArea,
  MgnpColorAreaThumb,
  MgnpColorField,
  MgnpColorPicker,
  MgnpColorSlider,
  MgnpColorSliderThumb,
  MgnpColorSliderTrack,
  MgnpColorSwatch,
} from '@mgremy/ng-primitives/color-picker';

import { Component } from '@angular/core';

@Component({
  imports: [
    MgnpColorPicker,
    MgnpColorArea,
    MgnpColorAreaThumb,
    MgnpColorSlider,
    MgnpColorSliderTrack,
    MgnpColorSliderThumb,
    MgnpColorField,
    MgnpColorSwatch,
  ],
  template: `
    <div class="flex flex-col gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <div mgnpColorPicker [color]="color" [mgnpColorPickerDefaultValue]="c">
          <div mgnpColorArea mgnpColorAreaXChannel="saturation" mgnpColorAreaYChannel="brightness">
            <div mgnpColorAreaThumb></div>
          </div>

          <div mgnpColorSlider mgnpColorSliderChannel="hue">
            <div mgnpColorSliderTrack></div>
            <div mgnpColorSliderThumb></div>
          </div>

          <div class="flex flex-row gap-4 items-center">
            <div mgnpColorSwatch></div>
            <input mgnpColorField aria-label="Hex" />
          </div>
        </div>
      }
    </div>
  `,
})
export default class ColorPicker {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
  readonly c = Color.parse('#00a6f4');
}
