import { MgnpDatePicker } from '../mgnp-date-picker/mgnp-date-picker';
import { MgnpDateRangePicker } from '../mgnp-date-range-picker/mgnp-date-range-picker';

import { Directive, inject } from '@angular/core';
import {
  injectDatePickerLabelState,
  NgpDatePickerLabel,
  provideDatePickerLabelState,
} from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerLabel]',
  providers: [provideDatePickerLabelState()],
  host: {
    class: 'mgnp-date-picker-label mgnp-c-date-picker-label',
    'data-mgnp-date-picker-label': '',
    '[attr.data-mgnp-date-picker-label-color]': 'datePicker?.color() ?? dateRangePicker?.color()',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerLabel,
      inputs: ['aria-live:aria-live'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerLabel',
})
export class MgnpDatePickerLabel {
  protected readonly datePicker = inject(MgnpDatePicker, { optional: true });
  protected readonly dateRangePicker = inject(MgnpDateRangePicker, { optional: true });

  readonly state = injectDatePickerLabelState();
}
