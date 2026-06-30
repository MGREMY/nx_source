import { Directive } from '@angular/core';
import { NgpDialogTitle } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialogTitle]',
  host: {
    class: 'mgnp-dialog-title mgnp-c-dialog-title',
    'data-mgnp-dialog-title': '',
  },
  hostDirectives: [
    {
      directive: NgpDialogTitle,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDialogTitle',
})
export class MgnpDialogTitle {}
