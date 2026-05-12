import { Directive, inject } from '@angular/core';
import { NgpSwitchThumb } from 'ng-primitives/switch';

const options = ['ngpSwitchThumb'];

const error = new Error(`MgnpSwitchThumb must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpSwitchThumb][mgnpSwitchThumb]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-switch-thumb',
  },
})
export class MgnpSwitchThumb {
  private readonly _ngpSwitchThumb = inject(NgpSwitchThumb, { optional: true });

  constructor() {
    if (!this._ngpSwitchThumb) {
      console.error(this);
      throw error;
    }
  }
}
