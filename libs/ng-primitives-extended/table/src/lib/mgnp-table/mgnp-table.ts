import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'mgnp-table, table[mgnpTable]',
  imports: [NgTemplateOutlet],
  standalone: true,
  template: `
    <thead>
      <ng-container [ngTemplateOutlet]="tableHeader()" />
    </thead>
    <tbody>
      @for (item of data(); track $index) {
        <ng-container
          [ngTemplateOutlet]="tableBody()"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </tbody>
    <tfoot>
      <ng-container [ngTemplateOutlet]="tableFooter()" />
    </tfoot>
  `,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-component': 'mgnp-table',
  },
})
export class MgnpTable {
  readonly tableHeader = input<TemplateRef<unknown>>();
  readonly tableBody = input<TemplateRef<unknown>>();
  readonly tableFooter = input<TemplateRef<unknown>>();

  readonly data = input<unknown[]>();
}
