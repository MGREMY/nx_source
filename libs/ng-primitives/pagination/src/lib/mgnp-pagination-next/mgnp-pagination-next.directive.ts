import { Directive } from '@angular/core';
import { NgpPaginationNext } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationNext]',
  standalone: true,
  host: {
    class: 'mgnp-pagination-next mgnp-c-pagination-next',
    'data-mgnp-pagination-next': '',
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
export class MgnpPaginationNext {}
