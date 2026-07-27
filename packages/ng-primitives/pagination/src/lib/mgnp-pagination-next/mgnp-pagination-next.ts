import { MgnpPagination } from '../mgnp-pagination/mgnp-pagination';

import { Directive, inject } from '@angular/core';
import {
  injectPaginationNextState,
  NgpPaginationNext,
  providePaginationNextState,
} from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationNext]',
  providers: [providePaginationNextState()],
  host: {
    class: 'mgnp-pagination-next mgnp-c-pagination-next',
    'data-mgnp-pagination-next': '',
    '[attr.data-mgnp-pagination-next-color]': 'pagination.color()',
  },
  hostDirectives: [
    {
      directive: NgpPaginationNext,
      inputs: ['ngpPaginationNextDisabled:mgnpPaginationNextDisabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationNext',
})
export class MgnpPaginationNext {
  protected readonly pagination = inject(MgnpPagination);

  readonly state = injectPaginationNextState();
}
