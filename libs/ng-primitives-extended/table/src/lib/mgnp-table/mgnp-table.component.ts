import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'mgnp-table, table[mgnpTable]',
  imports: [NgTemplateOutlet],
  standalone: true,
  templateUrl: './mgnp-table.component.html',
  styleUrl: './mgnp-table.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MgnpTable {
  readonly tableHeader = input<TemplateRef<unknown>>();
  readonly tableBody = input<TemplateRef<unknown>>();
  readonly tableFooter = input<TemplateRef<unknown>>();

  readonly data = input<unknown[]>();
}
