import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-header, tr[mgnpTableHeader]',
  imports: [],
  standalone: true,
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-component': 'mgnp-table-header',
  },
})
export class MgnpTableHeader {}
