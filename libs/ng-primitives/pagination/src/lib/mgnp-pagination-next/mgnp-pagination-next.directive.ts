import { Directive } from '@angular/core';
import { NgpPaginationNext } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationNext]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-pagination-next',
  },
  hostDirectives: [
    {
      directive: NgpPaginationNext,
      inputs: ['ngpPaginationNextDisabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationNext',
})
export class MgnpPaginationNext {}
