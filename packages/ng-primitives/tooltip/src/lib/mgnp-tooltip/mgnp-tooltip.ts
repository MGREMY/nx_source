import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { NgpTooltip } from 'ng-primitives/tooltip';

export type MgnpTooltipColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpTooltip]',
  host: {
    class: 'mgnp-tooltip mgnp-c-tooltip',
    'data-mgnp-tooltip': '',
    '[attr.data-mgnp-tooltip-color]': 'color()',
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
export class MgnpTooltip {
  readonly color = input<MgnpTooltipColor>('ui');
}
