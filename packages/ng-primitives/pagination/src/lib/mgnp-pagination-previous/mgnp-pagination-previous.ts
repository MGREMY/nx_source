import { MgnpPagination } from '../mgnp-pagination/mgnp-pagination';

import { Directive, inject } from '@angular/core';
import { NgpPaginationPrevious } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationPrevious]',
  host: {
    class: 'mgnp-pagination-previous mgnp-c-pagination-previous',
    'data-mgnp-pagination-previous': '',
    '[attr.data-mgnp-pagination-previous-color]': 'pagination.color()',
  },
  hostDirectives: [
    {
      directive: NgpPaginationPrevious,
      inputs: ['ngpPaginationPreviousDisabled:mgnpPaginationPreviousDisabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationPrevious',
})
export class MgnpPaginationPrevious {
  protected readonly pagination = inject(MgnpPagination);
}
