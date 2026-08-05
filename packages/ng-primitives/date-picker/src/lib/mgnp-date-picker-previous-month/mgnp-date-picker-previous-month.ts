import { MgnpDatePicker } from '../mgnp-date-picker/mgnp-date-picker';
import { MgnpDateRangePicker } from '../mgnp-date-range-picker/mgnp-date-range-picker';

import { Directive, inject } from '@angular/core';
import {
  injectDatePickerPreviousMonthState,
  NgpDatePickerPreviousMonth,
  provideDatePickerPreviousMonthState,
} from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerPreviousMonth]',
  providers: [provideDatePickerPreviousMonthState()],
  host: {
    class: 'mgnp-date-picker-previous-month mgnp-c-date-picker-previous-month',
    'data-mgnp-date-picker-previous-month': '',
    '[attr.data-mgnp-date-picker-previous-month-color]':
      'datePicker?.color() ?? dateRangePicker?.color()',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerPreviousMonth,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerPreviousMonth',
})
export class MgnpDatePickerPreviousMonth {
  protected readonly datePicker = inject(MgnpDatePicker, { optional: true });
  protected readonly dateRangePicker = inject(MgnpDateRangePicker, { optional: true });

  readonly state = injectDatePickerPreviousMonthState();
}
