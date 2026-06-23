import { Directive } from '@angular/core';
import { NgpPaginationPrevious } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationPrevious]',
  standalone: true,
  host: {
    class: 'mgnp-pagination-previous mgnp-c-pagination-previous',
    'data-mgnp-pagination-previous': '',
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
export class MgnpPaginationPrevious {}
