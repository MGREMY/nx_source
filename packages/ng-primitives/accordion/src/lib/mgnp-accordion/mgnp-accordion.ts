import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { injectAccordionState, NgpAccordion, provideAccordionState } from 'ng-primitives/accordion';

export type MgnpAccordionCva = {
  variant: 'default';
  orientation: 'horizontal' | 'vertical';
};

export const [mgnpAccordionVariants, provideMgnpAccordionConfig, injectMgnpAccordionConfig] =
  createMgnpComponent<MgnpAccordionCva>('accordion', {
    variant: 'default',
    orientation: 'vertical',
  });

@Directive({
  selector: '[mgnpAccordion]',
  providers: [provideAccordionState()],
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
  private readonly _ngpAccordion = injectAccordionState();

  public readonly config = injectMgnpAccordionConfig();
  public readonly state = injectAccordionState();

  public readonly variant = input<MgnpAccordionCva['variant']>(this.config.variant);

  public constructor() {
    classes(() =>
      mgnpAccordionVariants({
        variant: this.variant(),
        orientation: this._ngpAccordion().orientation(),
      })
    );
  }
}
