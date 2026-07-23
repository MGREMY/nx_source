import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectComboboxState, NgpCombobox, provideComboboxState } from 'ng-primitives/combobox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpComboboxColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpCombobox]',
  providers: [provideComboboxState(), provideValueAccessor(MgnpCombobox)],
  host: {
    class: 'mgnp-combobox mgnp-c-combobox',
    'data-mgnp-combobox': '',
    '[attr.data-mgnp-combobox-color]': 'color()',
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
  protected readonly state = injectComboboxState();

  readonly color = input<MgnpComboboxColor>('ui');

  protected onChangeFn?: ChangeFn<T>;
  protected onTouchedFn?: TouchedFn;

  constructor() {
    this.state()
      .valueChange // TODO : pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  writeValue(value: T): void {
    this.state().value.set(value);
  }

  registerOnChange(fn: ChangeFn<T>): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(value: boolean): void {
    this.state().disabled.set(value);
  }
}
