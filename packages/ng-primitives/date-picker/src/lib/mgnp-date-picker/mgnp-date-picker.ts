import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  injectDatePickerState,
  NgpDatePicker,
  provideDatePickerState,
} from 'ng-primitives/date-picker';
import { provideValueAccessor } from 'ng-primitives/utils';

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
export class MgnpDatePicker<T = Date> extends MgnpValueAccessor<T | undefined> {
  readonly state = injectDatePickerState<T>();

  readonly color = input<MgnpDatePickerColor>('ui');

  constructor() {
    super();

    this.state()
      .dateChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));
  }

  writeValue(value: T): void {
    this.state().select(value, false, { emit: false });
  }

  override setDisabledState(isDisabled: boolean): void {
    this.state().setDisabled(isDisabled);
  }
}
