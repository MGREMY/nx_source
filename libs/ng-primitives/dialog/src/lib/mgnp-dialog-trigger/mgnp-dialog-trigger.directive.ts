import { Directive } from '@angular/core';
import { NgpDialogTrigger } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialogTrigger]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog-trigger',
  },
  hostDirectives: [
    {
      directive: NgpDialogTrigger,
      inputs: [
        'ngpDialogTrigger:mgnpDialogTrigger',
        'ngpDialogTriggerCloseOnEscape:closeOnEscape',
        'ngpDialogTriggerCloseOnOutsideClick:closeOnOutsideClick',
      ],
      outputs: ['ngpDialogTriggerClosed:closed'],
    },
  ],
  exportAs: 'mgnpDialogTrigger',
})
export class MgnpDialogTrigger {}
