import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { injectAccordionState, NgpAccordion, provideAccordionState } from 'ng-primitives/accordion';

export type MgnpAccordionCva = {
  variant: {
    default: ClassValue;
  };
  orientation: {
    vertical: ClassValue;
    horizontal: ClassValue;
  };
};

export const mgnpAccordionVariants = cva<MgnpAccordionCva>('mgnp-accordion group/mgnp-accordion', {
  variants: {
    variant: {
      default: 'mgnp-accordion-variant-default',
    },
    orientation: {
      vertical: 'mgnp-accordion-orientation-vertical',
      horizontal: 'mgnp-accordion-orientation-horizontal',
    },
  },
});

export type MgnpAccordionVariants = VariantProps<typeof mgnpAccordionVariants>;

export const [provideMgnpAccordionConfig, injectMgnpAccordionConfig] = createMgnpComponentConfig<{
  variant: MgnpAccordionVariants['variant'];
  orientation: MgnpAccordionVariants['orientation'];
}>('MgnpAccordion', {
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

  public readonly variant = input<MgnpAccordionVariants['variant']>(this.config.variant);

  public constructor() {
    classes(() =>
      mgnpAccordionVariants({
        variant: this.variant(),
        orientation: this._ngpAccordion().orientation(),
      })
    );
  }
}
