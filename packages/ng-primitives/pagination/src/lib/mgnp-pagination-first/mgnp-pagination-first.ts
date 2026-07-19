import { MgnpPagination } from '../mgnp-pagination/mgnp-pagination';

import { Directive, inject } from '@angular/core';
import { NgpPaginationFirst } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationFirst]',
  host: {
    class: 'mgnp-pagination-first mgnp-c-pagination-first',
    'data-mgnp-pagination-first': '',
    '[attr.data-mgnp-pagination-first-color]': 'pagination.color()',
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
export class MgnpPaginationFirst {
  protected readonly pagination = inject(MgnpPagination);
}
