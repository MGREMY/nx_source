import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import {
  Color,
  injectColorPickerState,
  NgpColorPicker,
  provideColorPickerState,
} from 'ng-primitives/color';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpColorPickerColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpColorPicker]',
  providers: [provideColorPickerState(), provideValueAccessor(MgnpColorPicker)],
  host: {
    class: 'mgnp-color-picker mgnp-c-color-picker',
    'data-mgnp-color-picker': '',
    '[attr.data-mgnp-color-picker-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpColorPicker,
      inputs: [
        'ngpColorPickerValue:mgnpColorPickerValue',
        'ngpColorPickerDefaultValue:mgnpColorPickerDefaultValue',
      ],
      outputs: ['ngpColorPickerValueChange:mgnpColorPickerValueChange'],
    },
  ],
  exportAs: 'mgnpColorPicker',
})
export class MgnpColorPicker implements ControlValueAccessor {
  readonly state = injectColorPickerState();

  protected onChangeFn?: ChangeFn<Color>;
  protected onTouchedFn?: TouchedFn;

  readonly color = input<MgnpColorPickerColor>('ui');

  constructor() {
    this.state()
      .valueChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  writeValue(value: Color | string): void {
    if (typeof value === 'string') this.state().setValue(Color.parse(value));
    else this.state().setValue(value);
  }

  registerOnChange(fn: ChangeFn<Color>): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }
}
