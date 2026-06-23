import { Directive } from '@angular/core';
import { NgpDialogDescription } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialogDescription]',
  standalone: true,
  host: {
    class: 'mgnp-dialog-description mgnp-c-dialog-description',
    'data-mgnp-dialog-description': '',
  },
  hostDirectives: [
    {
      directive: NgpDialogDescription,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDialogDescription',
})
export class MgnpDialogDescription {}
