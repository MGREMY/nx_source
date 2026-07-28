import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
  injectNumberFieldState,
  NgpNumberField,
  provideNumberFieldState,
} from 'ng-primitives/number-field';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpNumberFieldColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpNumberField]',
  providers: [provideNumberFieldState(), provideValueAccessor(MgnpNumberField)],
  host: {
    class: 'mgnp-number-field mgnp-c-number-field',
    'data-mgnp-number-field': '',
    '[attr.data-mgnp-number-field-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpNumberField,
      inputs: [
        'ngpNumberFieldValue:mgnpNumberFieldValue',
        'ngpNumberFieldMin:mgnpNumberFieldMin',
        'ngpNumberFieldMax:mgnpNumberFieldMax',
        'ngpNumberFieldStep:mgnpNumberFieldStep',
        'ngpNumberFieldLargeStep:mgnpNumberFieldLargeStep',
        'ngpNumberFieldDisabled:mgnpNumberFieldDisabled',
        'ngpNumberFieldReadonly:mgnpNumberFieldReadonly',
      ],
      outputs: ['ngpNumberFieldValueChange:mgnpNumberFieldValueChange'],
    },
  ],
  exportAs: 'mgnpNumberField',
})
export class MgnpNumberField implements ControlValueAccessor {
  readonly state = injectNumberFieldState();

  readonly color = input<MgnpNumberFieldColor>('ui');

  protected onChangeFn?: ChangeFn<number | null>;
  protected onTouchedFn?: TouchedFn;

  constructor() {
    this.state()
      .valueChange // TODO : pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  writeValue(value: number | null): void {
    this.state().setValue(value);
  }

  registerOnChange(fn: ChangeFn<number | null>): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.state().setDisabled(isDisabled);
  }
}
