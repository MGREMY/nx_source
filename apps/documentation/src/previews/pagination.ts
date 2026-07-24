import {
  MgnpPagination,
  MgnpPaginationButton,
  MgnpPaginationFirst,
  MgnpPaginationLast,
  MgnpPaginationNext,
  MgnpPaginationPrevious,
} from '@mgremy/ng-primitives/pagination';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronDoubleLeft,
  heroChevronDoubleRight,
  heroChevronLeft,
  heroChevronRight,
} from '@ng-icons/heroicons/outline';

import { Component, signal } from '@angular/core';

@Component({
  imports: [
    MgnpPagination,
    MgnpPaginationButton,
    MgnpPaginationFirst,
    MgnpPaginationPrevious,
    MgnpPaginationNext,
    MgnpPaginationLast,
    NgIcon,
  ],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-2 items-center w-full">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <nav
          class="justify-self-end"
          mgnpPagination
          [color]="color"
          [(mgnpPaginationPage)]="page"
          mgnpPaginationPageCount="5"
          aria-label="Pagination Navigation">
          <ul>
            <li>
              <a mgnpPaginationFirst aria-label="First Page">
                <ng-icon name="heroChevronDoubleLeft" />
              </a>
            </li>
            <li>
              <a mgnpPaginationPrevious aria-label="Previous Page">
                <ng-icon name="heroChevronLeft" />
              </a>
            </li>

            <li><a mgnpPaginationButton mgnpPaginationButtonPage="1" aria-label="Page 1">1</a></li>
            <li><a mgnpPaginationButton mgnpPaginationButtonPage="2" aria-label="Page 2">2</a></li>
            <li><a mgnpPaginationButton mgnpPaginationButtonPage="3" aria-label="Page 3">3</a></li>
            <li><a mgnpPaginationButton mgnpPaginationButtonPage="4" aria-label="Page 4">4</a></li>
            <li><a mgnpPaginationButton mgnpPaginationButtonPage="5" aria-label="Page 5">5</a></li>

            <li>
              <a mgnpPaginationNext aria-label="Next Page">
                <ng-icon name="heroChevronRight" />
              </a>
            </li>
            <li>
              <a mgnpPaginationLast aria-label="Last Page">
                <ng-icon name="heroChevronDoubleRight" />
              </a>
            </li>
          </ul>
        </nav>
      }
    </div>
  `,
  providers: [
    provideIcons({
      heroChevronDoubleLeft,
      heroChevronLeft,
      heroChevronDoubleRight,
      heroChevronRight,
    }),
  ],
})
export default class Pagination {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];

  readonly page = signal(1);
}
