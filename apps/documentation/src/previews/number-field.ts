import {
  MgnpNumberField,
  MgnpNumberFieldDecrement,
  MgnpNumberFieldIncrement,
  MgnpNumberFieldInput,
} from '@mgremy/ng-primitives/number-field';

import { Component, signal } from '@angular/core';

@Component({
  imports: [MgnpNumberField, MgnpNumberFieldInput, MgnpNumberFieldIncrement, MgnpNumberFieldDecrement],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <div mgnpNumberField [color]="color" [(mgnpNumberFieldValue)]="value">
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

  readonly value = signal<number>(0);
}
