import { Directive, inject } from '@angular/core';
import { NgpTooltip } from 'ng-primitives/tooltip';

const options = ['ngpTooltip'];

const error = new Error(`MgnpTooltip must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpTooltip][mgnpTooltip]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-tooltip',
  },
})
export class MgnpTooltip {
  protected readonly ngpTooltip = inject(NgpTooltip, { optional: true });

  constructor() {
    if (!this.ngpTooltip) {
      console.error(this);
      throw error;
    }
  }
}
