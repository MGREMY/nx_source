import { Directive, inject } from '@angular/core';
import { NgpDialog } from 'ng-primitives/dialog';

const options = ['ngpDialog'];

const error = new Error(`MgnpDialog must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpDialog][mgnpDialog]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog',
  },
})
export class MgnpDialog {
  private readonly _ngpDialog = inject(NgpDialog);

  constructor() {
    if (!this._ngpDialog) {
      console.error(this);
      throw error;
    }
  }
}
