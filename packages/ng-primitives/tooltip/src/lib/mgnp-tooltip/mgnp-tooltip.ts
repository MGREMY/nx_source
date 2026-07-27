import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectTooltipState, NgpTooltip, provideTooltipState } from 'ng-primitives/tooltip';

export type MgnpTooltipColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpTooltip]',
  providers: [provideTooltipState()],
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
  readonly state = injectTooltipState();

  readonly color = input<MgnpTooltipColor>('ui');
}
