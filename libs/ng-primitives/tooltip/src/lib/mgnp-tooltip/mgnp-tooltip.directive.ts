import { Directive } from '@angular/core';
import { NgpTooltip } from 'ng-primitives/tooltip';

@Directive({
  selector: '[mgnpTooltip]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-tooltip',
  },
  hostDirectives: [
    {
      directive: NgpTooltip,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpTooltip',
})
export class MgnpTooltip {}
