import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-body, tr[mgnpTableBody]',
  imports: [],
  standalone: true,
  templateUrl: './mgnp-table-body.component.html',
  styleUrl: './mgnp-table-body.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MgnpTableBody {}
