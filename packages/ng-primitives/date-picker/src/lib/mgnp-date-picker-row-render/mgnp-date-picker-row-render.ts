import { Directive } from '@angular/core';
import { NgpDatePickerRowRender } from 'ng-primitives/date-picker';

@Directive({
  selector: '[mgnpDatePickerRowRender]',
  providers: [],
  host: {
    class: 'mgnp-date-picker-row-render mgnp-c-date-picker-row-render',
    'data-mgnp-date-picker-row-render': '',
  },
  hostDirectives: [
    {
      directive: NgpDatePickerRowRender,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDatePickerRowRender',
})
export class MgnpDatePickerRowRender {}
