import { MgnpTable } from '../mgnp-table/mgnp-table';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'mgnp-table-body, tr[mgnpTableBody]',
  imports: [],
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-table-body': '',
    class: 'mgnp-table-body mgnp-c-table-body',
    '[attr.data-mgnp-table-body-color]': 'table.color()',
  },
})
export class MgnpTableBody {
  protected readonly table = inject(MgnpTable);
}
