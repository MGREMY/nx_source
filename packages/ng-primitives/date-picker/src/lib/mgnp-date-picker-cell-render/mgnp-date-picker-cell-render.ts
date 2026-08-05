import { Directive } from '@angular/core';
import { NgpDatePickerCellRender } from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerCellRender]',
  providers: [],
  host: {
    class: 'mgnp-date-picker-cell-render mgnp-c-date-picker-cell-render',
    'data-mgnp-date-picker-cell-render': '',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerCellRender,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerCellRender',
})
export class MgnpDatePickerCellRender {}
