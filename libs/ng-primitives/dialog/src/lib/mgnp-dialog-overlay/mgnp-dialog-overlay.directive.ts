import { Directive, inject } from '@angular/core';
import { NgpDialogOverlay } from 'ng-primitives/dialog';

const options = ['ngpDialogOverlay'];

const error = new Error(`MgnpDialogOverlay must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpDialogOverlay][mgnpDialogOverlay]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog-overlay',
  },
})
export class MgnpDialogOverlay {
  private readonly _ngpDialogOverlay = inject(NgpDialogOverlay, { optional: true });

  constructor() {
    if (!this._ngpDialogOverlay) {
      console.error(this);
      throw error;
    }
  }
}
