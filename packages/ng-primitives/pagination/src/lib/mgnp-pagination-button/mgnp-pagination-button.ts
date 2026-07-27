import { MgnpPagination } from '../mgnp-pagination/mgnp-pagination';

import { Directive, inject } from '@angular/core';
import {
  injectPaginationButtonState,
  NgpPaginationButton,
  providePaginationButtonState,
} from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationButton]',
  providers: [providePaginationButtonState()],
  host: {
    class: 'mgnp-pagination-button mgnp-c-pagination-button',
    'data-mgnp-pagination-button': '',
    '[attr.data-mgnp-pagination-button-color]': 'pagination.color()',
  },
  hostDirectives: [
    {
      directive: NgpPaginationButton,
      inputs: [
        'ngpPaginationButtonPage:mgnpPaginationButtonPage',
        'ngpPaginationButtonDisabled:mgnpPaginationButtonDisabled',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationButton',
})
export class MgnpPaginationButton {
  protected readonly pagination = inject(MgnpPagination);

  readonly state = injectPaginationButtonState();
}
