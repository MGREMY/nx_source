import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, inject, input } from '@angular/core';
import { NgpAccordionTrigger } from 'ng-primitives/accordion';
import { NgpButton } from 'ng-primitives/button';
import { NgpComboboxButton } from 'ng-primitives/combobox';
import { NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltipTrigger } from 'ng-primitives/tooltip';

const options = [
  'ngpButton',
  'ngpComboboxButton',
  'ngpMenuTrigger',
  'ngpTooltipTrigger',
  'ngpAccordionTrigger',
];

const error = new Error(`MgnpButton must be used with ${options.join(' / ')}`);

export type MgnpButtonColor = PropertyType<
  'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
>;
export type MgnpButtonVariant = PropertyType<'solid'>;

@Directive({
  selector: `[ngpButton][mgnpButton],
    [ngpComboboxButton][mgnpButton],
    [ngpMenuTrigger][mgnpButton],
    [ngpTooltipTrigger][mgnpButton],
    [ngpAccordionTrigger][mgnpButton]`,
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-button',
    '[attr.data-mgnp-color]': 'color() || null',
    '[attr.data-mgnp-variant]': 'variant() || null',
  },
})
export class MgnpButton {
  protected readonly ngpButton = inject(NgpButton, { optional: true });
  protected readonly ngpComboboxButton = inject(NgpComboboxButton, {
    optional: true,
  });
  protected readonly ngpMenuTrigger = inject(NgpMenuTrigger, {
    optional: true,
  });
  protected readonly ngpTooltipTrigger = inject(NgpTooltipTrigger, { optional: true });
  protected readonly ngpAccordionTrigger = inject(NgpAccordionTrigger, { optional: true });

  readonly color = input<MgnpButtonColor | undefined>();
  readonly variant = input<MgnpButtonVariant>('solid');

  constructor() {
    if (
      !this.ngpButton &&
      !this.ngpComboboxButton &&
      !this.ngpMenuTrigger &&
      !this.ngpTooltipTrigger &&
      !this.ngpAccordionTrigger
    ) {
      console.error(this);
      throw error;
    }
  }
}
