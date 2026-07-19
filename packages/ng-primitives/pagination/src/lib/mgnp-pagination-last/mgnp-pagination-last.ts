import { MgnpPagination } from '../mgnp-pagination/mgnp-pagination';

import { Directive, inject } from '@angular/core';
import { NgpPaginationLast } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationLast]',
  host: {
    class: 'mgnp-pagination-last mgnp-c-pagination-last',
    'data-mgnp-pagination-last': '',
    '[attr.data-mgnp-pagination-last-color]': 'pagination.color()',
  },
  hostDirectives: [
    {
      directive: NgpPaginationLast,
      inputs: ['ngpPaginationLastDisabled:mgnpPaginationLastdisabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationLast',
})
export class MgnpPaginationLast {
  protected readonly pagination = inject(MgnpPagination);
}
