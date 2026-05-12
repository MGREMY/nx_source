import { Directive, inject } from '@angular/core';
import { NgpSwitch } from 'ng-primitives/switch';

const options = ['ngpSwitch'];

const error = new Error(`MgnpSwitch must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpSwitch][mgnpSwitch]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-switch',
  },
})
export class MgnpSwitch {
  private readonly _ngpSwitch = inject(NgpSwitch, { optional: true });

  constructor() {
    if (!this._ngpSwitch) {
      console.error(this);
      throw error;
    }
  }
}
