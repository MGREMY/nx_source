import { Directive } from '@angular/core';
import { NgpPaginationFirst } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationFirst]',
  host: {
    class: 'mgnp-pagination-first mgnp-c-pagination-first',
    'data-mgnp-pagination-first': '',
  },
  hostDirectives: [
    {
      directive: NgpPaginationFirst,
      inputs: ['ngpPaginationFirstDisabled:mgnpPaginationFirstDisabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationFirst',
})
export class MgnpPaginationFirst {}
