import { MgnpDatePicker } from '../mgnp-date-picker/mgnp-date-picker';
import { MgnpDateRangePicker } from '../mgnp-date-range-picker/mgnp-date-range-picker';

import { Directive, inject } from '@angular/core';
import {
  injectDatePickerDateButtonState,
  NgpDatePickerDateButton,
  provideDatePickerDateButtonState,
} from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerDateButton]',
  providers: [provideDatePickerDateButtonState()],
  host: {
    class: 'mgnp-date-picker-date-button mgnp-c-date-picker-date-button',
    'data-mgnp-date-picker-date-button': '',
    '[attr.data-mgnp-date-picker-date-button-color]':
      'datePicker?.color() ?? dateRangePicker?.color()',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerDateButton,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerDateButton',
})
export class MgnpDatePickerDateButton {
  protected readonly datePicker = inject(MgnpDatePicker, { optional: true });
  protected readonly dateRangePicker = inject(MgnpDateRangePicker, { optional: true });

  readonly state = injectDatePickerDateButtonState();
}
