import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectComboboxState, NgpCombobox, provideComboboxState } from 'ng-primitives/combobox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Directive({
  selector: '[mgnpCombobox]',
  standalone: true,
  providers: [provideComboboxState(), provideValueAccessor(MgnpCombobox)],
  host: {
    class: 'mgnp-combobox mgnp-c-combobox',
    'data-mgnp-combobox': '',
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpCombobox,
      inputs: [
        'ngpComboboxValue:value',
        'ngpComboboxMultiple:multiple',
        'ngpComboboxDisabled:disabled',
        'ngpComboboxAllowDeselect:allowDeselect',
        'ngpComboboxCompareWith:compareWith',
        'ngpComboboxDropdownPlacement:dropdownPlacement',
        'ngpComboboxDropdownContainer:dropdownContainer',
        'ngpComboboxDropdownFlip:dropdownFlip',
        'ngpComboboxDropdownOffset:dropdownOffset',
        'ngpComboboxScrollToOption:scrollToOption',
        'ngpComboboxOptions:options',
      ],
      outputs: ['ngpComboboxValueChange:valueChange', 'ngpComboboxOpenChange:openChange'],
    },
  ],
  exportAs: 'mgnpCombobox',
})
export class MgnpCombobox<T> implements ControlValueAccessor {
  protected readonly state = injectComboboxState();

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
