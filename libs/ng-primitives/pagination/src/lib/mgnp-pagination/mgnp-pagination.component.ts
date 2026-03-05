import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronDoubleLeft,
  heroChevronDoubleRight,
  heroChevronLeft,
  heroChevronRight,
} from '@ng-icons/heroicons/outline';

import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
  injectPaginationState,
  NgpPagination,
  NgpPaginationButton,
  NgpPaginationFirst,
  NgpPaginationLast,
  NgpPaginationNext,
  NgpPaginationPrevious,
} from 'ng-primitives/pagination';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Component({
  selector: 'mgnp-pagination',
  imports: [
    NgpPaginationButton,
    NgpPaginationFirst,
    NgpPaginationLast,
    NgpPaginationNext,
    NgpPaginationPrevious,
    NgIcon,
  ],
  standalone: true,
  templateUrl: './mgnp-pagination.component.html',
  styleUrl: './mgnp-pagination.component.css',
  providers: [
    provideValueAccessor(NgpPagination),
    provideIcons({
      heroChevronDoubleLeft,
      heroChevronDoubleRight,
      heroChevronLeft,
      heroChevronRight,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(focusout)': 'onTouched?.()',
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
})
export class MgnpPagination implements ControlValueAccessor {
  /** Access the pagination state */
  protected readonly state = injectPaginationState();

  /** Get the pages as an array we can iterate over */
  protected readonly pages = computed(() =>
    Array.from({ length: this.state().pageCount() }).map((_, i) => i + 1),
  );

  /** The onChange callback */
  private onChange?: ChangeFn<number>;

  /** The onTouched callback */
  protected onTouched?: TouchedFn;

  constructor() {
    this.state().pageChange.subscribe((value) => this.onChange?.(value));
  }

  /** Write a new value to the control */
  writeValue(value: number): void {
    this.state().page.set(value);
  }

  /** Register a callback to be called when the value changes */
  registerOnChange(fn: ChangeFn<number>): void {
    this.onChange = fn;
  }

  /** Register a callback to be called when the control is touched */
  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }
}
