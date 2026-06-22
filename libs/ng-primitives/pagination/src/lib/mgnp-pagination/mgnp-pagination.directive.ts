import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
  injectPaginationState,
  NgpPagination,
  providePaginationState,
} from 'ng-primitives/pagination';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Directive({
  selector: '[mgnpPagination]',
  standalone: true,
  providers: [providePaginationState(), provideValueAccessor(MgnpPagination)],
  host: {
    class: 'mgnp-pagination mgnp-c-pagination',
    'data-mgnp-pagination': '',
    '(focusout)': 'onTouched?.()',
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
export class MgnpPagination implements ControlValueAccessor {
  protected readonly state = injectPaginationState();

  protected onChange?: ChangeFn<number>;
  protected onTouched?: TouchedFn;

  constructor() {
    this.state()
      .pageChange // TODO pipe(takeUntilDestroy())
      .subscribe((value) => this.onChange?.(value));
  }

  writeValue(value: number): void {
    this.state().page.set(value);
  }

  registerOnChange(fn: ChangeFn<number>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(value: boolean): void {
    this.state().disabled.set(value);
  }
}
