import { Directive } from '@angular/core';
import { NgpPaginationFirst } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationFirst]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-pagination-first',
  },
  hostDirectives: [
    {
      directive: NgpPaginationFirst,
      inputs: ['ngpPaginationFirstDisabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationFirst',
})
export class MgnpPaginationFirst {}
