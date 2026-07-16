import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectAccordionState, NgpAccordion, provideAccordionState } from 'ng-primitives/accordion';

export type MgnpAccordionColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpAccordion]',
  providers: [provideAccordionState()],
  host: {
    class: 'mgnp-accordion mgnp-c-accordion',
    'data-mgnp-accordion': '',
    '[attr.data-mgnp-accordion-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpAccordion,
      inputs: [
        'ngpAccordionType:mgnpAccordionType',
        'ngpAccordionCollapsible:mgnpAccordionCollapsible',
        'ngpAccordionValue:mgnpAccordionValue',
        'ngpAccordionDisabled:mgnpAccordionDisabled',
        'ngpAccordionOrientation:mgnpAccordionOrientation',
      ],
      outputs: ['ngpAccordionValueChange:mgnpAccordionValueChange'],
    },
  ],
  exportAs: 'mgnpAccordion',
})
export class MgnpAccordion {
  protected readonly state = injectAccordionState();

  readonly color = input<MgnpAccordionColor>('ui');
}
