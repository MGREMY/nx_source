import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-table-footer, tr[mgnpTableFooter]',
  imports: [],
  standalone: true,
  templateUrl: './mgnp-table-footer.component.html',
  styleUrl: './mgnp-table-footer.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MgnpTableFooter {}
