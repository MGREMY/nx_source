import { MgnpDatePicker } from '../mgnp-date-picker/mgnp-date-picker';
import { MgnpDateRangePicker } from '../mgnp-date-range-picker/mgnp-date-range-picker';

import { Directive, inject } from '@angular/core';
import {
  injectDatePickerNextMonthState,
  NgpDatePickerNextMonth,
  provideDatePickerNextMonthState,
} from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerNextMonth]',
  providers: [provideDatePickerNextMonthState()],
  host: {
    class: 'mgnp-date-picker-next-month mgnp-c-date-picker-next-month',
    'data-mgnp-date-picker-next-month': '',
    '[attr.data-mgnp-date-picker-next-month-color]':
      'datePicker?.color() ?? dateRangePicker?.color()',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerNextMonth,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerNextMonth',
})
export class MgnpDatePickerNextMonth {
  protected readonly datePicker = inject(MgnpDatePicker, { optional: true });
  protected readonly dateRangePicker = inject(MgnpDateRangePicker, { optional: true });

  readonly state = injectDatePickerNextMonthState();
}
