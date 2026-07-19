import { MgnpMenu } from '../mgnp-menu/mgnp-menu';

import { Directive, inject } from '@angular/core';
import { NgpMenuItemIndicator } from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemIndicator]',
  host: {
    class: 'mgnp-menu-item-indicator mgnp-c-menu-item-indicator',
    'data-mgnp-menu-item-indicator': '',
    '[attr.data-mgnp-menu-item-indicator-color]': 'menu.color()',
  },
  hostDirectives: [
    {
      directive: NgpMenuItemIndicator,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenuItemIndicator',
})
export class MgnpMenuItemIndicator {
  protected readonly menu = inject(MgnpMenu);
}
