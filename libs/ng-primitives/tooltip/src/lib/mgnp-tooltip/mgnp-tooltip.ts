import { Directive } from '@angular/core';
import { NgpTooltip } from 'ng-primitives/tooltip';

@Directive({
  selector: '[mgnpTooltip]',
  host: {
    class: 'mgnp-tooltip mgnp-c-tooltip',
    'data-mgnp-tooltip': '',
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
