import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-header, tr[mgnpTableHeader]',
  imports: [],
  standalone: true,
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-table-header': '',
    class: 'mgnp-table-header mgnp-c-table-header',
  },
})
export class MgnpTableHeader {}
