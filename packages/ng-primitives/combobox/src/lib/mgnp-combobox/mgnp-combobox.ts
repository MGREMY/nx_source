import { injectMgnpComboboxConfig } from './mgnp-combobox.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { cva, VariantProps } from 'class-variance-authority';
import { injectComboboxState, NgpCombobox, provideComboboxState } from 'ng-primitives/combobox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export const mgnpComboboxVariants = cva('mgnp-combobox group/mgnp-combobox', {
  variants: {
    variant: {
      default: 'mgnp-combobox-variant-default',
      primary: 'mgnp-combobox-variant-primary',
      accent: 'mgnp-combobox-variant-accent',
      info: 'mgnp-combobox-variant-info',
      success: 'mgnp-combobox-variant-success',
      warning: 'mgnp-combobox-variant-warning',
      danger: 'mgnp-combobox-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpComboboxVariants = VariantProps<typeof mgnpComboboxVariants>;

@Directive({
  selector: '[mgnpCombobox]',
  providers: [provideComboboxState(), provideValueAccessor(MgnpCombobox)],
  host: {
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpCombobox,
      inputs: [
        'ngpComboboxValue:mgnpComboboxValue',
        'ngpComboboxMultiple:mgnpComboboxMultiple',
        'ngpComboboxDisabled:mgnpComboboxDisabled',
        'ngpComboboxAllowDeselect:mgnpComboboxAllowDeselect',
        'ngpComboboxCompareWith:mgnpComboboxCompareWith',
        'ngpComboboxDropdownPlacement:mgnpComboboxDropdownPlacement',
        'ngpComboboxDropdownContainer:mgnpComboboxDropdownContainer',
        'ngpComboboxDropdownFlip:mgnpComboboxDropdownFlip',
        'ngpComboboxDropdownOffset:mgnpComboboxDropdownOffset',
        'ngpComboboxScrollToOption:mgnpComboboxScrollToOption',
        'ngpComboboxOptions:mgnpComboboxOptions',
      ],
      outputs: [
        'ngpComboboxValueChange:mgnpComboboxValueChange',
        'ngpComboboxOpenChange:mgnpComboboxOpenChange',
      ],
    },
  ],
  exportAs: 'mgnpCombobox',
})
export class MgnpCombobox<T> implements ControlValueAccessor {
  public readonly config = injectMgnpComboboxConfig();
  public readonly state = injectComboboxState();

  public readonly variant = input<MgnpComboboxVariants['variant']>(this.config.variant);

  protected onChangeFn?: ChangeFn<T>;
  protected onTouchedFn?: TouchedFn;

  public constructor() {
    classes(() => mgnpComboboxVariants({ variant: this.variant() }));

    this.state()
      .valueChange // TODO : pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  public writeValue(value: T): void {
    this.state().value.set(value);
  }

  public registerOnChange(fn: ChangeFn<T>): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(value: boolean): void {
    this.state().disabled.set(value);
  }
}
