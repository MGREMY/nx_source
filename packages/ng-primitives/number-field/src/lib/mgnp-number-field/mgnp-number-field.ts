import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  injectNumberFieldState,
  NgpNumberField,
  provideNumberFieldState,
} from 'ng-primitives/number-field';
import { provideValueAccessor } from 'ng-primitives/utils';

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
export class MgnpNumberField extends MgnpValueAccessor<number | null> {
  readonly state = injectNumberFieldState();

  readonly color = input<MgnpNumberFieldColor>('ui');

  constructor() {
    super();

    this.state()
      .valueChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));
  }

  writeValue(value: number | null): void {
    this.state().setValue(value);
  }

  override setDisabledState(isDisabled: boolean): void {
    this.state().setDisabled(isDisabled);
  }
}
