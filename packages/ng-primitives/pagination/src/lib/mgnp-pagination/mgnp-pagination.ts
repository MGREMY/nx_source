import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  injectPaginationState,
  NgpPagination,
  providePaginationState,
} from 'ng-primitives/pagination';
import { provideValueAccessor } from 'ng-primitives/utils';

export type MgnpPaginationColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpPagination]',
  providers: [providePaginationState(), provideValueAccessor(MgnpPagination)],
  host: {
    class: 'mgnp-pagination mgnp-c-pagination',
    'data-mgnp-pagination': '',
    '[attr.data-mgnp-pagination-color]': 'color()',
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
export class MgnpPagination extends MgnpValueAccessor<number> {
  readonly state = injectPaginationState();

  readonly color = input<MgnpPaginationColor>('ui');

  constructor() {
    super();

    this.state()
      .pageChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));
  }

  writeValue(value: number): void {
    this.state().page.set(value);
  }

  override setDisabledState(value: boolean): void {
    this.state().disabled.set(value);
  }
}
