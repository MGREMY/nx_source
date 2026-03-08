import { MgnpPagination } from '@mgremy/ng-primitives/pagination';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronDoubleLeft,
  heroChevronDoubleRight,
  heroChevronLeft,
  heroChevronRight,
} from '@ng-icons/heroicons/outline';

import { Component, signal } from '@angular/core';
import {
  NgpPagination,
  NgpPaginationButton,
  NgpPaginationFirst,
  NgpPaginationLast,
  NgpPaginationNext,
  NgpPaginationPrevious,
} from 'ng-primitives/pagination';

@Component({
  imports: [
    NgpPagination,
    NgpPaginationButton,
    NgpPaginationFirst,
    NgpPaginationPrevious,
    NgpPaginationNext,
    NgpPaginationLast,
    MgnpPagination,
    NgIcon,
  ],
  template: `
    <nav
      [(ngpPaginationPage)]="page"
      ngpPagination
      ngpPaginationPageCount="5"
      mgnpPagination
      aria-label="Pagination Navigation">
      <ul>
        <li>
          <a
            ngpPaginationFirst
            aria-label="First Page">
            <ng-icon name="heroChevronDoubleLeft" />
          </a>
        </li>
        <li>
          <a
            ngpPaginationPrevious
            aria-label="Previous Page">
            <ng-icon name="heroChevronLeft" />
          </a>
        </li>

        <li>
          <a
            ngpPaginationButton
            ngpPaginationButtonPage="1"
            aria-label="Page 1">
            1
          </a>
        </li>
        <li>
          <a
            ngpPaginationButton
            ngpPaginationButtonPage="2"
            aria-label="Page 2">
            2
          </a>
        </li>
        <li>
          <a
            ngpPaginationButton
            ngpPaginationButtonPage="3"
            aria-label="Page 3">
            3
          </a>
        </li>
        <li>
          <a
            ngpPaginationButton
            ngpPaginationButtonPage="4"
            aria-label="Page 4">
            4
          </a>
        </li>
        <li>
          <a
            ngpPaginationButton
            ngpPaginationButtonPage="5"
            aria-label="Page 5">
            5
          </a>
        </li>

        <li>
          <a
            ngpPaginationNext
            aria-label="Next Page">
            <ng-icon name="heroChevronRight" />
          </a>
        </li>
        <li>
          <a
            ngpPaginationLast
            aria-label="Last Page">
            <ng-icon name="heroChevronDoubleRight" />
          </a>
        </li>
      </ul>
    </nav>
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
export default class ButtonExample {
  readonly page = signal(1);
}
