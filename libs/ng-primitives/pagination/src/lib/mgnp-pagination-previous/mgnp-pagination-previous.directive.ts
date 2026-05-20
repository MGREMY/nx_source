import { Directive } from '@angular/core';
import { NgpPaginationPrevious } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationPrevious]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-pagination-previous',
  },
  hostDirectives: [
    {
      directive: NgpPaginationPrevious,
      inputs: ['ngpPaginationPreviousDisabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationPrevious',
})
export class MgnpPaginationPrevious {}
