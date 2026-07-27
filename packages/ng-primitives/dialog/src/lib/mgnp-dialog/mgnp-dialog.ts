import { MgnpDialogOverlay } from '../mgnp-dialog-overlay/mgnp-dialog-overlay';

import { Directive, inject } from '@angular/core';
import { injectDialogState, NgpDialog, provideDialogState } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialog]',
  providers: [provideDialogState()],
  host: {
    class: 'mgnp-dialog mgnp-c-dialog',
    'data-mgnp-dialog': '',
    '[attr.data-mgnp-dialog-color]': 'overlay.color()',
    '[attr.data-mgnp-dialog-position]': 'overlay.drawerPosition()',
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

  readonly state = injectDialogState();
}
