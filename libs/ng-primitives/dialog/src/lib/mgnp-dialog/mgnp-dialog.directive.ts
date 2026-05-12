import { MgnpDialogOverlay } from '../mgnp-dialog-overlay/mgnp-dialog-overlay.directive';

import { Directive, inject } from '@angular/core';
import { NgpDialog } from 'ng-primitives/dialog';

const options = ['ngpDialog'];

const error = new Error(`MgnpDialog must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpDialog][mgnpDialog]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog',
    '[attr.data-mgnp-mode]': '_overlay.mode()',
  },
})
export class MgnpDialog {
  protected readonly _overlay = inject(MgnpDialogOverlay);
  private readonly _ngpDialog = inject(NgpDialog, { optional: true });

  constructor() {
    if (!this._ngpDialog) {
      console.error(this);
      throw error;
    }
  }
}
