import { MgnpDatePicker } from '../mgnp-date-picker/mgnp-date-picker';
import { MgnpDateRangePicker } from '../mgnp-date-range-picker/mgnp-date-range-picker';

import { Directive, inject } from '@angular/core';
import {
  injectDatePickerGridState,
  NgpDatePickerGrid,
  provideDatePickerGridState,
} from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerGrid]',
  providers: [provideDatePickerGridState()],
  host: {
    class: 'mgnp-date-picker-grid mgnp-c-date-picker-grid',
    'data-mgnp-date-picker-grid': '',
    '[attr.data-mgnp-date-picker-grid-color]': 'datePicker?.color() ?? dateRangePicker?.color()',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerGrid,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerGrid',
})
export class MgnpDatePickerGrid {
  protected readonly datePicker = inject(MgnpDatePicker, { optional: true });
  protected readonly dateRangePicker = inject(MgnpDateRangePicker, { optional: true });

  readonly state = injectDatePickerGridState();
}
