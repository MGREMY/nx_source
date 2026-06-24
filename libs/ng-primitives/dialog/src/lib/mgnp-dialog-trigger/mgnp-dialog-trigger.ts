import { Directive } from '@angular/core';
import { NgpDialogTrigger } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialogTrigger]',
  host: {
    class: 'mgnp-dialog-trigger mgnp-c-dialog-trigger',
    'data-mgnp-dialog-trigger': '',
  },
  hostDirectives: [
    {
      directive: NgpDialogTrigger,
      inputs: [
        'ngpDialogTrigger:mgnpDialogTrigger',
        'ngpDialogTriggerCloseOnEscape:mgnpDialogTriggerCloseOnEscape',
        'ngpDialogTriggerCloseOnOutsideClick:mgnpDialogTriggerCloseOnOutsideClick',
      ],
      outputs: ['ngpDialogTriggerClosed:mgnpDialogTriggerClosed'],
    },
  ],
  exportAs: 'mgnpDialogTrigger',
})
export class MgnpDialogTrigger {}
