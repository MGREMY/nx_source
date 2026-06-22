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
    class: 'mgnp-pagination mgnp-c-pagination',
    'data-mgnp-pagination': '',
  },
  hostDirectives: [
    {
      directive: NgpPagination,
      inputs: [
        'ngpPaginationPage:mgnpPaginationPage',
        'ngpPaginationPageCount:mgnpPaginationPageCount',
        'ngpPaginationDisabled:mgnpPaginationDisabled',
      ],
      outputs: ['ngpPaginationPageChange:mgnpPaginationPageChange'],
    },
  ],
  exportAs: 'mgnpPagination',
})
export class MgnpPagination {
  protected readonly state = injectPaginationState();
}
