import { Directive } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { injectCheckboxState, NgpCheckbox, provideCheckboxState } from 'ng-primitives/checkbox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Directive({
  selector: `[mgnpCheckbox]`,
  standalone: true,
  providers: [provideCheckboxState(), provideValueAccessor(MgnpCheckbox)],
  host: {
    'data-mgnp-component': 'mgnp-checkbox',
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpCheckbox,
      inputs: [
        'ngpCheckboxChecked:checked',
        'ngpCheckboxDefaultChecked:defaultChecked',
        'ngpCheckboxIndeterminate:indeterminate',
        'ngpCheckboxRequired:required',
        'ngpCheckboxDisabled:disabled',
      ],
      outputs: [
        'ngpCheckboxCheckedChange:checkedChange',
        'ngpCheckboxIndeterminateChange:indeterminateChange',
      ],
    },
  ],
  exportAs: 'mgnpCheckbox',
})
export class MgnpCheckbox implements ControlValueAccessor {
  protected readonly state = injectCheckboxState();

  protected onChangeFn?: ChangeFn<boolean>;
  protected onTouchedFn?: TouchedFn;

  constructor() {
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
