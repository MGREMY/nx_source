import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-body, tr[mgnpTableBody]',
  imports: [],
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-table-body': '',
    class: 'mgnp-table-body mgnp-c-table-body',
  },
})
export class MgnpTableBody {}
