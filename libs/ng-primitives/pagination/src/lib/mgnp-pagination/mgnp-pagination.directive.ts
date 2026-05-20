import { Directive } from '@angular/core';
import {
  injectPaginationState,
  NgpPagination,
  providePaginationState,
} from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPagination]',
  standalone: true,
  providers: [providePaginationState()],
  host: {
    'data-mgnp-component': 'mgnp-pagination',
  },
  hostDirectives: [
    {
      directive: NgpPagination,
      inputs: [
        'ngpPaginationPage:page',
        'ngpPaginationPageCount:pageCount',
        'ngpPaginationDisabled:disabled',
      ],
      outputs: ['ngpPaginationPageChange:pageChange'],
    },
  ],
  exportAs: 'mgnpPagination',
})
export class MgnpPagination {
  protected readonly state = injectPaginationState();
}
