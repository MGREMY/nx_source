import { Directive } from '@angular/core';
import { NgpPaginationButton } from 'ng-primitives/pagination';

@Directive({
  selector: '[mgnpPaginationButton]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-pagination-button',
  },
  hostDirectives: [
    {
      directive: NgpPaginationButton,
      inputs: ['ngpPaginationButtonPage:page', 'ngpPaginationButtonDisabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPaginationButton',
})
export class MgnpPaginationButton {}
