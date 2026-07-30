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

import { Component, signal } from '@angular/core';

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
    <div class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 w-full items-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <div mgnpColorPicker class="justify-self-center" [color]="color" [(mgnpColorPickerValue)]="selectedColor">
          <div mgnpColorArea mgnpColorAreaXChannel="saturation" mgnpColorAreaYChannel="brightness">
            <div mgnpColorAreaThumb></div>
          </div>

          <div mgnpColorSlider mgnpColorSliderChannel="hue">
            <div mgnpColorSliderTrack></div>
            <div mgnpColorSliderThumb></div>
          </div>

          <div class="flex flex-row gap-4 items-center">
            <div [mgnpColorSwatch]="selectedColor()"></div>
            <input mgnpColorField aria-label="Hex" />
          </div>
        </div>
      }
    </div>
  `,
})
export default class ColorPicker {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];

  readonly selectedColor = signal<Color>(Color.parse('#00a6f4'));
}
