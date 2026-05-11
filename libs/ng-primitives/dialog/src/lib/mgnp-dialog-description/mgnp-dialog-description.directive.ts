import { Directive, inject } from '@angular/core';
import { NgpDialogDescription } from 'ng-primitives/dialog';

const options = ['ngpDialogDescription'];

const error = new Error(`MgnpDialogDescription must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpDialogDescription][mgnpDialogDescription]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog-description',
  },
})
export class MgnpDialogDescription {
  private readonly _ngpDialogDescription = inject(NgpDialogDescription, { optional: true });

  constructor() {
    if (!this._ngpDialogDescription) {
      console.error(this);
      throw error;
    }
  }
}
