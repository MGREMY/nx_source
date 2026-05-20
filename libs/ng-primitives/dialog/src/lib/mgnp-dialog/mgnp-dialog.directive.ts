import { MgnpDialogOverlay } from '../mgnp-dialog-overlay/mgnp-dialog-overlay.directive';

import { Directive, inject } from '@angular/core';
import { injectDialogState, NgpDialog } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialog]',
  standalone: true,
  providers: [],
  host: {
    'data-mgnp-component': 'mgnp-dialog',
    '[attr.data-mgnp-mode]': 'overlay.mode()',
  },
  hostDirectives: [
    {
      directive: NgpDialog,
      inputs: ['ngpDialogRole:role', 'ngpDialogModal:modal'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDialog',
})
export class MgnpDialog {
  protected readonly overlay = inject(MgnpDialogOverlay);
  protected readonly state = injectDialogState();
}
