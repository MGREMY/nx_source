import { Directive, inject } from '@angular/core';
import { NgpDialogTitle } from 'ng-primitives/dialog';

const options = ['ngpDialogTitle'];

const error = new Error(`MgnpDialogTitle must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpDialogTitle][mgnpDialogTitle]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog-title',
  },
})
export class MgnpDialogTitle {
  private readonly _ngpDialogTitle = inject(NgpDialogTitle);

  constructor() {
    if (!this._ngpDialogTitle) {
      console.error(this);
      throw error;
    }
  }
}
