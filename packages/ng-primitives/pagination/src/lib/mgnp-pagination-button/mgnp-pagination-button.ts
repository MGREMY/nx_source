import { Directive } from '@angular/core';
import { NgpPaginationButton } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationButton]',
  host: {
    class: 'mgnp-pagination-button mgnp-c-pagination-button',
    'data-mgnp-pagination-button': '',
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
export class MgnpPaginationButton {}
