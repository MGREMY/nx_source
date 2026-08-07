import { MgnpDateRange } from '../mgnp-date-range';
import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  injectDateRangePickerState,
  NgpDateRangePicker,
  provideDateRangePickerState,
} from 'ng-primitives/date-picker';
import { provideValueAccessor } from 'ng-primitives/utils';

export type MgnpDateRangePickerColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpDateRangePicker]',
  providers: [provideDateRangePickerState(), provideValueAccessor(MgnpDateRangePicker)],
  host: {
    class: 'mgnp-date-range-picker mgnp-c-date-range-picker',
    'data-mgnp-date-range-picker': '',
    '[attr.data-mgnp-date-picker-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpDateRangePicker,
      inputs: [
        'ngpDateRangePickerMin:mgnpDateRangePickerMin',
        'ngpDateRangePickerMax:mgnpDateRangePickerMax',
        'ngpDateRangePickerDisabled:mgnpDateRangePickerDisabled',
        'ngpDateRangePickerDateDisabled:mgnpDateRangePickerDateDisabled',
        'ngpDateRangePickerFirstDayOfWeek:mgnpDateRangePickerFirstDayOfWeek',
        'ngpDateRangePickerStartDate:mgnpDateRangePickerStartDate',
        'ngpDateRangePickerDefaultStartDate:mgnpDateRangePickerDefaultStartDate',
        'ngpDateRangePickerEndDate:mgnpDateRangePickerEndDate',
        'ngpDateRangePickerDefaultEndDate:mgnpDateRangePickerDefaultEndDate',
        'ngpDateRangePickerFocusedDate:mgnpDateRangePickerFocusedDate',
        'ngpDateRangePickerDefaultFocusedDate:mgnpDateRangePickerDefaultFocusedDate',
      ],
      outputs: [
        'ngpDateRangePickerStartDateChange:mgnpDateRangePickerStartDateChange',
        'ngpDateRangePickerEndDateChange:mgnpDateRangePickerEndDateChange',
        'ngpDateRangePickerFocusedDateChange:mgnpDateRangePickerFocusedDateChange',
      ],
    },
  ],
  exportAs: 'mgnpDateRangePicker',
})
export class MgnpDateRangePicker<T = Date> extends MgnpValueAccessor<MgnpDateRange<T>> {
  readonly state = injectDateRangePickerState<T>();

  readonly color = input<MgnpDateRangePickerColor>('ui');

  constructor() {
    super();

    this.state()
      .startDateChange.pipe(takeUntilDestroyed())
      .subscribe((value) =>
        this.formHandler.onChangedFn()?.({ start: value, end: this.state().endDate() })
      );

    this.state()
      .endDateChange.pipe(takeUntilDestroyed())
      .subscribe((value) =>
        this.formHandler.onChangedFn()?.({ start: this.state().startDate(), end: value })
      );
  }

  writeValue(value: MgnpDateRange<T>): void {
    this.state().setStart(value.start);
    this.state().setEnd(value.end);
  }

  override setDisabledState(isDisabled: boolean): void {
    this.state().setDisabled(isDisabled);
  }
}
