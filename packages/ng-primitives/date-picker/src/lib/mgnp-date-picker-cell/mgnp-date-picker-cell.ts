import { MgnpDateRangePicker } from '../mgnp-date-range-picker/mgnp-date-range-picker';
import { MgnpDatePicker } from './../mgnp-date-picker/mgnp-date-picker';

import { Directive, inject } from '@angular/core';
import {
  injectDatePickerCellState,
  NgpDatePickerCell,
  provideDatePickerCellState,
} from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerCell]',
  providers: [provideDatePickerCellState()],
  host: {
    class: 'mgnp-date-picker-cell mgnp-c-date-picker-cell',
    'data-mgnp-date-picker-cell': '',
    '[attr.data-mgnp-date-picker-cell-color]': 'datePicker?.color() ?? dateRangePicker?.color()',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerCell,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerCell',
})
export class MgnpDatePickerCell {
  protected readonly datePicker = inject(MgnpDatePicker, { optional: true });
  protected readonly dateRangePicker = inject(MgnpDateRangePicker, { optional: true });

  readonly state = injectDatePickerCellState();
}
