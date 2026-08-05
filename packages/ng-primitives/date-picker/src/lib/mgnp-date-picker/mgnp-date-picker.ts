import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import {
  injectDatePickerState,
  NgpDatePicker,
  provideDatePickerState,
} from 'ng-primitives/date-picker';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpDatePickerColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpDatePicker]',
  providers: [provideDatePickerState(), provideValueAccessor(MgnpDatePicker)],
  host: {
    class: 'mgnp-date-picker mgnp-c-date-picker',
    'data-mgnp-date-picker': '',
    '[attr.data-mgnp-date-picker-color]': 'color()',
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpDatePicker,
      inputs: [
        'ngpDatePickerMin:mgnpDatePickerMin',
        'ngpDatePickerMax:mgnpDatePickerMax',
        'ngpDatePickerDisabled:mgnpDatePickerDisabled',
        'ngpDatePickerDateDisabled:mgnpDatePickerDateDisabled',
        'ngpDatePickerFirstDayOfWeek:mgnpDatePickerFirstDayOfWeek',
        'ngpDatePickerDate:mgnpDatePickerDate',
        'ngpDatePickerDefaultDate:mgnpDatePickerDefaultDate',
        'ngpDatePickerFocusedDate:mgnpDatePickerFocusedDate',
        'ngpDatePickerDefaultFocusedDate:mgnpDatePickerDefaultFocusedDate',
      ],
      outputs: [
        'ngpDatePickerDateChange:mgnpDatePickerDateChange',
        'ngpDatePickerFocusedDateChange:mgnpDatePickerFocusedDateChange',
      ],
    },
  ],
  exportAs: 'mgnpDatePicker',
})
export class MgnpDatePicker<T = Date> implements ControlValueAccessor {
  readonly state = injectDatePickerState<T>();

  readonly color = input<MgnpDatePickerColor>('ui');

  protected onChangedFn?: ChangeFn<T | undefined>;
  protected onTouchedFn?: TouchedFn;

  constructor() {
    this.state()
      .dateChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangedFn?.(value));
  }

  writeValue(value: T): void {
    this.state().select(value, false, { emit: false });
  }

  registerOnChange(fn: ChangeFn<T | undefined>): void {
    this.onChangedFn = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.state().setDisabled(isDisabled);
  }
}
