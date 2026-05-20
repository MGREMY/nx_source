import { Directive } from '@angular/core';
import { NgpPaginationLast } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationLast]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-pagination-last',
  },
  hostDirectives: [
    {
      directive: NgpPaginationLast,
      inputs: ['ngpPaginationLastDisabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationLast',
})
export class MgnpPaginationLast {}
