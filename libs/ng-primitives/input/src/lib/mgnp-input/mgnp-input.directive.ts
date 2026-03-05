import { Directive, inject } from '@angular/core';
import { NgpInput } from 'ng-primitives/input';

const options = ['ngpInput'];

const error = new Error(`MgnpInput must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpInput][mgnpInput]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-input',
  },
})
export class MgnpInput {
  protected readonly ngpInput = inject(NgpInput, { optional: true });

  constructor() {
    if (!this.ngpInput) {
      console.error(this);
      throw error;
    }
  }
}
