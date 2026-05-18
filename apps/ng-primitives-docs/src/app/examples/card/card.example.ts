import { MgnpCard } from '@mgremy/ng-primitives-extended/card';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpCard],
  template: `
    <mgnp-card>

    </mgnp-card>
  `,
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class CardExample {}
