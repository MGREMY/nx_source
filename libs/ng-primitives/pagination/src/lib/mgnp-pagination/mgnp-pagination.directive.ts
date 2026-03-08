import { Directive, inject } from '@angular/core';
import { NgpPagination } from 'ng-primitives/pagination';

const options = ['ngpPagination'];

const error = new Error(`MgnpDirective must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpPagination][mgnpPagination]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-pagination',
  },
})
export class Pagination {
  protected readonly ngpPagination = inject(NgpPagination, { optional: true });

  constructor() {
    if (!this.ngpPagination) {
      console.error(this);
      throw error;
    }
  }
}
