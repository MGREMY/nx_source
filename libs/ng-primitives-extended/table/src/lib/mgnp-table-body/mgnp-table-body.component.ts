import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-body, tr[mgnpTableBody]',
  imports: [],
  standalone: true,
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-component': 'mgnp-table-body',
  },
})
export class MgnpTableBody {}
