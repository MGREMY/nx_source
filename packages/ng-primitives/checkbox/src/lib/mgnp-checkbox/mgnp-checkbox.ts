import { injectMgnpCheckboxConfig } from './mgnp-checkbox.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { cva, VariantProps } from 'class-variance-authority';
import { injectCheckboxState, NgpCheckbox, provideCheckboxState } from 'ng-primitives/checkbox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export const mgnpCheckboxVariants = cva('mgnp-checkbox group/mgnp-checkbox', {
  variants: {
    variant: {
      default: 'mgnp-checkbox-variant-default',
      primary: 'mgnp-checkbox-variant-primary',
      accent: 'mgnp-checkbox-variant-accent',
      info: 'mgnp-checkbox-variant-info',
      success: 'mgnp-checkbox-variant-success',
      warning: 'mgnp-checkbox-variant-warning',
      danger: 'mgnp-checkbox-variant-danger',
    },
    size: {
      xs: 'mgnp-checkbox-size-xs',
      sm: 'mgnp-checkbox-size-sm',
      md: 'mgnp-checkbox-size-md',
      lg: 'mgnp-checkbox-size-lg',
      xl: 'mgnp-checkbox-size-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type MgnpCheckboxVariants = VariantProps<typeof mgnpCheckboxVariants>;

@Directive({
  selector: `[mgnpCheckbox]`,
  providers: [provideCheckboxState(), provideValueAccessor(MgnpCheckbox)],
  host: {
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpCheckbox,
      inputs: [
        'ngpCheckboxChecked:mgnpCheckboxChecked',
        'ngpCheckboxDefaultChecked:mgnpCheckboxDefaultChecked',
        'ngpCheckboxIndeterminate:mgnpCheckboxIndeterminate',
        'ngpCheckboxRequired:mgnpCheckboxRequired',
        'ngpCheckboxDisabled:mgnpCheckboxDisabled',
      ],
      outputs: [
        'ngpCheckboxCheckedChange:mgnpCheckboxCheckedChange',
        'ngpCheckboxIndeterminateChange:mgnpCheckboxIndeterminateChange',
      ],
    },
  ],
  exportAs: 'mgnpCheckbox',
})
export class MgnpCheckbox implements ControlValueAccessor {
  public readonly config = injectMgnpCheckboxConfig();
  public readonly state = injectCheckboxState();

  protected onChangeFn?: ChangeFn<boolean>;
  protected onTouchedFn?: TouchedFn;

  public readonly variant = input<MgnpCheckboxVariants['variant']>(this.config.variant);
  public readonly size = input<MgnpCheckboxVariants['size']>(this.config.size);

  constructor() {
    classes(() => mgnpCheckboxVariants({ variant: this.variant(), size: this.size() }));

    this.state()
      .checkedChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  writeValue(value: boolean): void {
    this.state().setChecked(value);
  }

  registerOnChange(fn: ChangeFn<boolean>): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(value: boolean): void {
    this.state().setDisabled(value);
  }
}
