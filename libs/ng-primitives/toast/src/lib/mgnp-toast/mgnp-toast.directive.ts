import { Directive, inject } from '@angular/core';
import { NgpToast } from 'ng-primitives/toast';

const options = ['ngpToast'];

const error = new Error(`MgnpToast must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpToast][mgnpToast]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-toast'
  },
})
export class MgnpToast {
  protected readonly ngpToast = inject(NgpToast, { optional: true });

  constructor() {
    if (!this.ngpToast) {
      console.error(this);
      throw error;
    }
  }
}
