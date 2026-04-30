import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-footer, tr[mgnpTableFooter]',
  imports: [],
  standalone: true,
  template: '<ng-content />',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-component': 'mgnp-table-footer',
  },
})
export class MgnpTableFooter {}
