import { Directive, inject } from '@angular/core';
import { NgpCheckbox } from 'ng-primitives/checkbox';

const options = ['ngpCheckbox'];

const error = new Error(`MgnpCheckbox must be used with ${options.join(' / ')}`);

@Directive({
  selector: `[ngpCheckbox][mgnpCheckbox]`,
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-checkbox',
  },
})
export class MgnpCheckbox {
  protected readonly ngpCeckbox = inject(NgpCheckbox, { optional: true });

  constructor() {
    if (!this.ngpCeckbox) {
      console.error(this);
      throw error;
    }
  }
}
