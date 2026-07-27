import { MgnpDialogOverlay } from '../mgnp-dialog-overlay/mgnp-dialog-overlay';

import { Directive, inject } from '@angular/core';
import {
  injectDialogTitleState,
  NgpDialogTitle,
  provideDialogTitleState,
} from 'ng-primitives/dialog';

@Directive({
  selector: '[mgnpDialogTitle]',
  providers: [provideDialogTitleState()],
  host: {
    class: 'mgnp-dialog-title mgnp-c-dialog-title',
    'data-mgnp-dialog-title': '',
    '[attr.data-mgnp-dialog-title-color]': 'overlay.color()',
    '[attr.data-mgnp-dialog-title-mode]': 'overlay.mode()',
    '[attr.data-mgnp-dialog-title-position]': 'overlay.drawerPosition()',
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
export class MgnpDialogTitle {
  protected readonly overlay = inject(MgnpDialogOverlay);

  readonly state = injectDialogTitleState();
}
