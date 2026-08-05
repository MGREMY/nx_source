import { MgnpDatePicker } from '../mgnp-date-picker/mgnp-date-picker';
import { MgnpDateRangePicker } from '../mgnp-date-range-picker/mgnp-date-range-picker';

import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[mgnpDatePickerHeader]',
  providers: [],
  host: {
    class: 'mgnp-date-picker-header mgnp-c-date-picker-header',
    'data-mgnp-date-picker-header': '',
    '[attr.data-mgnp-date-picker-header-color]': 'datePicker?.color() ?? dateRangePicker?.color()',
  },
  hostDirectives: [],
  exportAs: 'mgnpDatePickerHeader',
})
export class MgnpDatePickerHeader {
  protected readonly datePicker = inject(MgnpDatePicker, { optional: true });
  protected readonly dateRangePicker = inject(MgnpDateRangePicker, { optional: true });
}
