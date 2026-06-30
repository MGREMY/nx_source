import { Directive } from '@angular/core';
import { NgpPaginationLast } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationLast]',
  host: {
    class: 'mgnp-pagination-last mgnp-c-pagination-last',
    'data-mgnp-pagination-last': '',
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
export class MgnpPaginationLast {}
