import { MgnpDialogOverlay } from '../mgnp-dialog-overlay/mgnp-dialog-overlay.directive';

import { Directive, inject } from '@angular/core';
import { injectDialogState, NgpDialog } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialog]',
  standalone: true,
  providers: [],
  host: {
    class: 'mgnp-dialog mgnp-c-dialog',
    'data-mgnp-dialog': '',
    '[attr.data-mgnp-dialog-mode]': 'overlay.mode()',
  },
  hostDirectives: [
    {
      directive: NgpDialog,
      inputs: ['ngpDialogRole:mgnpDialogRole', 'ngpDialogModal:mgnpDialogModal'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDialog',
})
export class MgnpDialog {
  protected readonly overlay = inject(MgnpDialogOverlay);
  protected readonly state = injectDialogState();
}
