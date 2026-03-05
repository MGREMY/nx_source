import { Directive, inject } from '@angular/core';
import { NgpTooltipArrow } from 'ng-primitives/tooltip';

const options = ['ngpTooltipArrow'];

const error = new Error(
  `MgnpTooltipArrow must be used with ${options.join(' / ')}`,
);

@Directive({
  selector: '[ngpTooltipArrow][mgnpTooltipArrow]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-tooltip-arrow',
  },
})
export class MgnpTooltipArrow {
  protected readonly ngpTooltipArrow = inject(NgpTooltipArrow, {
    optional: true,
  });

  constructor() {
    if (!this.ngpTooltipArrow) {
      console.error(this);
      throw error;
    }
  }
}
