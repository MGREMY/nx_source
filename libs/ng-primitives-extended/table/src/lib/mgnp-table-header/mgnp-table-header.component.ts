import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-header, tr[mgnpTableHeader]',
  imports: [],
  standalone: true,
  templateUrl: './mgnp-table-header.component.html',
  styleUrl: './mgnp-table-header.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MgnpTableHeader {}
