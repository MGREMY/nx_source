import { MgnpTable, MgnpTableBody, MgnpTableFooter, MgnpTableHeader } from '@mgremy/ng-primitives-extended/table';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpTable, MgnpTableHeader, MgnpTableBody, MgnpTableFooter],
  template: `
    <mgnp-table [tableHeader]="header" [tableBody]="body" [tableFooter]="footer" [data]="data" />

    <ng-template #header>
      <tr mgnpTableHeader>
        <th scope="col"><span>Name</span></th>
        <th scope="col"><span>Quantity</span></th>
        <th scope="col"><span>Price</span></th>
      </tr>
    </ng-template>

    <ng-template #body let-record>
      <tr mgnpTableBody>
        <td>{{ record.name }}</td>
        <td>{{ record.qty }}</td>
        <td>{{ record.price }}</td>
      </tr>
    </ng-template>

    <ng-template #footer>
      <tr mgnpTableFooter>
        <td>This is a footer value</td>
      </tr>
    </ng-template>
  `,
})
export default class LoaderExample {
  data = Array.from({ length: 5 }, (_, i) => i++).map((x) => ({
    name: `Product ${x}`,
    qty: x,
    price: x * x,
  }));
}
