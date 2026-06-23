import { Directive } from '@angular/core';
import { NgpMenuItemIndicator } from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemIndicator]',
  standalone: true,
  host: {
    class: 'mgnp-menu-item-indicator mgnp-c-menu-item-indicator',
    'data-mgnp-menu-item-indicator': '',
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
export class MgnpMenuItemIndicator {}
