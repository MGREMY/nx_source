import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, inject, input } from '@angular/core';
import { NgpAccordionTrigger } from 'ng-primitives/accordion';
import { NgpButton } from 'ng-primitives/button';
import { NgpComboboxButton } from 'ng-primitives/combobox';
import { NgpDialogTrigger } from 'ng-primitives/dialog';
import { NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltipTrigger } from 'ng-primitives/tooltip';

const options = [
  'ngpButton',
  'ngpComboboxButton',
  'ngpMenuTrigger',
  'ngpTooltipTrigger',
  'ngpAccordionTrigger',
  'ngpDialogTrigger',
];

const error = new Error(`MgnpButton must be used with ${options.join(' / ')}`);

export type MgnpButtonColor = PropertyType<
  'ui' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
>;

export type MgnpButtonVariant = PropertyType<'solid' | 'outline'>;

export type MgnpButtonSize = PropertyType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

@Directive({
  selector: `[ngpButton][mgnpButton],
    [ngpComboboxButton][mgnpButton],
    [ngpMenuTrigger][mgnpButton],
    [ngpTooltipTrigger][mgnpButton],
    [ngpAccordionTrigger][mgnpButton],
    [ngpDialogTrigger][mgnpButton]`,
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-button',
    '[attr.data-mgnp-size]': 'size()',
    '[attr.data-mgnp-color]': 'color()',
    '[attr.data-mgnp-variant]': 'variant()',
  },
})
export class MgnpButton {
  protected readonly ngpButton = inject(NgpButton, { optional: true });
  protected readonly ngpComboboxButton = inject(NgpComboboxButton, { optional: true });
  protected readonly ngpMenuTrigger = inject(NgpMenuTrigger, { optional: true });
  protected readonly ngpTooltipTrigger = inject(NgpTooltipTrigger, { optional: true });
  protected readonly ngpAccordionTrigger = inject(NgpAccordionTrigger, { optional: true });
  protected readonly ngpDialogTrigger = inject(NgpDialogTrigger, { optional: true });

  readonly color = input<MgnpButtonColor>('ui');
  readonly variant = input<MgnpButtonVariant>('solid');
  readonly size = input<MgnpButtonSize>('md');

  constructor() {
    if (
      !this.ngpButton &&
      !this.ngpComboboxButton &&
      !this.ngpMenuTrigger &&
      !this.ngpTooltipTrigger &&
      !this.ngpAccordionTrigger &&
      !this.ngpDialogTrigger
    ) {
      console.error(this);
      throw error;
    }
  }
}
