import { MgnpAccordion, MgnpAccordionCva } from '../mgnp-accordion/mgnp-accordion';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectAccordionItemState,
  injectAccordionState,
  NgpAccordionItem,
  provideAccordionItemState,
} from 'ng-primitives/accordion';

export type MgnpAccordionItemCva = MgnpAccordionCva;

export const [
  mgnpAccordionItemVariants,
  provideMgnpAccordionItemConfig,
  injectMgnpAccordionItemConfig,
] = createMgnpComponent<MgnpAccordionItemCva>('accordion-item', {
  variant: 'default',
  orientation: 'vertical',
});

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
