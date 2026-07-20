import { MgnpTable } from '../mgnp-table/mgnp-table';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'mgnp-table-footer, tr[mgnpTableFooter]',
  imports: [],
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-table-footer': '',
    class: 'mgnp-table-footer mgnp-c-table-footer',
    '[attr.data-mgnp-table-footer-color]': 'table.color()',
  },
})
export class MgnpTableFooter {
  protected readonly table = inject(MgnpTable);
}
