import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectComboboxState, NgpCombobox, provideComboboxState } from 'ng-primitives/combobox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpComboboxCva = {
  variant: 'default' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
};

export const [mgnpComboboxVariants, provideMgnpComboboxConfig, injectMgnpComboboxConfig] =
  createMgnpComponent<MgnpComboboxCva>('combobox', {
    variant: 'default',
  });

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

  public readonly variant = input<MgnpComboboxCva['variant']>(this.config.variant);

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
