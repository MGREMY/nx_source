import {
  MgnpNumberField,
  MgnpNumberFieldDecrement,
  MgnpNumberFieldIncrement,
  MgnpNumberFieldInput,
} from '@mgremy/ng-primitives/number-field';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpNumberField, MgnpNumberFieldInput, MgnpNumberFieldIncrement, MgnpNumberFieldDecrement],
  template: `
    <div class="grid grid-rows-2 gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span class="place-self-center">{{ color }}</span>
        <div class="place-self-center" mgnpNumberField [color]="color">
          <button mgnpNumberFieldDecrement>-</button>
          <input mgnpNumberFieldInput />
          <button mgnpNumberFieldIncrement>+</button>
        </div>
      }
    </div>
  `,
})
export default class NumberField {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
