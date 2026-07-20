import { MgnpDialogOverlay } from '../mgnp-dialog-overlay/mgnp-dialog-overlay';

import { Directive, inject } from '@angular/core';
import { NgpDialogDescription } from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialogDescription]',
  host: {
    class: 'mgnp-dialog-description mgnp-c-dialog-description',
    'data-mgnp-dialog-description': '',
    '[attr.data-mgnp-dialog-description-color]': 'overlay.color()',
    '[attr.data-mgnp-dialog-description-position]': 'overlay.drawerPosition()',
    '[attr.data-mgnp-dialog-description-mode]': 'overlay.mode()',
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
export class MgnpDialogDescription {
  protected readonly overlay = inject(MgnpDialogOverlay);
}
