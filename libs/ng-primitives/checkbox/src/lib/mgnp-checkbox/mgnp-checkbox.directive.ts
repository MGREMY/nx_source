import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { injectCheckboxState, NgpCheckbox, provideCheckboxState } from 'ng-primitives/checkbox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpCheckboxColor = PropertyType<
  'ui' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
>;

export type MgnpCheckboxSize = PropertyType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

@Directive({
  selector: `[mgnpCheckbox]`,
  standalone: true,
  providers: [provideCheckboxState(), provideValueAccessor(MgnpCheckbox)],
  host: {
    'data-mgnp-component': 'mgnp-checkbox',
    '[attr.data-mgnp-size]': 'size()',
    '[attr.data-mgnp-color]': 'color()',
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

  readonly color = input<MgnpCheckboxColor>('ui');
  readonly size = input<MgnpCheckboxSize>('md');

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
