import { Directive } from '@angular/core';
import { NgpMenuItemIndicator } from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenuItemIndicator]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-menu-item-indicator',
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
