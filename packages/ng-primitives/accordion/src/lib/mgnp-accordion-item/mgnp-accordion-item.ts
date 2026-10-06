import { MgnpAccordion } from '../mgnp-accordion/mgnp-accordion';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAccordionItemState,
  injectAccordionState,
  NgpAccordionItem,
  provideAccordionItemState,
} from 'ng-primitives/accordion';

export const [provideMgnpAccordionItemConfig, injectMgnpAccordionItemConfig] =
  createMgnpComponentConfig<{
    variant: MgnpAccordionItemVariants['variant'];
  }>('MgnpAccordionItem', {
    variant: 'default',
  });

export const mgnpAccordionItemVariants = cva('mgnp-accordion-item group/mgnp-accordion-item', {
  variants: {
    variant: {
      default: 'mgnp-accordion-item-variant-default',
    },
    orientation: {
      vertical: 'mgnp-accordion-item-orientation-vertical',
      horizontal: 'mgnp-accordion-item-orientation-horizontal',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpAccordionItemVariants = VariantProps<typeof mgnpAccordionItemVariants>;

@Directive({
  selector: '[mgnpAccordionItem]',
  providers: [provideAccordionItemState()],
  hostDirectives: [
    {
      directive: NgpAccordionItem,
      inputs: [
        'ngpAccordionItemValue:mgnpAccordionItemValue',
        'ngpAccordionItemDisabled:mgnpAccordionItemDisabled',
      ],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAccordionItem',
})
export class MgnpAccordionItem {
  private readonly _ngpAccordion = injectAccordionState();
  private readonly _accordion = inject(MgnpAccordion);

  public readonly config = injectMgnpAccordionItemConfig();
  public readonly state = injectAccordionItemState();

  public constructor() {
    classes(() =>
      mgnpAccordionItemVariants({
        variant: this._accordion.variant(),
        orientation: this._ngpAccordion().orientation(),
      })
    );
  }
}
