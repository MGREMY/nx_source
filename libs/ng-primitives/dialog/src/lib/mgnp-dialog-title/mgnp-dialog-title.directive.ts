import { Directive } from '@angular/core';
import { NgpDialogTitle } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialogTitle]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog-title',
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
