import { MgnpTable } from '../mgnp-table/mgnp-table';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'mgnp-table-header, tr[mgnpTableHeader]',
  imports: [],
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-table-header': '',
    class: 'mgnp-table-header mgnp-c-table-header',
    '[attr.data-mgnp-table-header-color]': 'table.color()',
  },
})
export class MgnpTableHeader {
  protected readonly table = inject(MgnpTable);
}
