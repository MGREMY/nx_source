import {
  Color,
  MgnpColorArea,
  MgnpColorAreaThumb,
  MgnpColorField,
  MgnpColorPicker,
  MgnpColorPickerCva,
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
      @for (variant of _variants; track $index) {
        <span>{{ variant }}</span>
        <div mgnpColorPicker [variant]="variant" [mgnpColorPickerDefaultValue]="c">
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
  readonly _variants = [
    'default',
    'primary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
  ] as MgnpColorPickerCva['variant'][];
  readonly c = Color.parse('#00a6f4');
}
