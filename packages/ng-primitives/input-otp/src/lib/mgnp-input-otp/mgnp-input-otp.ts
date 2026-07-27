import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input, model } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectInputOtpState, NgpInputOtp, provideInputOtpState } from 'ng-primitives/input-otp';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpInputOtpColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

export type MgnpInputOtpSize = PropertyType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

@Directive({
  selector: '[mgnpInputOtp]',
  providers: [provideInputOtpState(), provideValueAccessor(MgnpInputOtp)],
  host: {
    class: 'mgnp-input-otp mgnp-c-input-otp',
    'data-mgnp-input-otp': '',
    '[attr.data-mgnp-input-otp-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpInputOtp,
      inputs: [
        'ngpInputOtpValue:mgnpInputOtpValue',
        'ngpInputOtpPattern:mgnpInputOtpPattern',
        'ngpInputOtpInputMode:mgnpInputOtpInputMode',
        'ngpInputOtpPasteTransformer:mgnpInputOtpPasteTransformer',
        'ngpInputOtpDisabled:mgnpInputOtpDisabled',
        'ngpInputOtpPlaceholder:mgnpInputOtpPlaceholder',
      ],
      outputs: [
        'ngpInputOtpValueChange:mgnpInputOtpValueChange',
        'ngpInputOtpComplete:mgnpInputOtpComplete',
      ],
    },
  ],
  exportAs: 'mgnpInputOtp',
})
export class MgnpInputOtp implements ControlValueAccessor {
  readonly state = injectInputOtpState();

  readonly color = input<MgnpInputOtpColor>('ui');
  readonly size = input<MgnpInputOtpSize>('md');

  readonly value = model<string>('');

  private onChange?: ChangeFn<string>;
  private onTouched?: TouchedFn;

  constructor() {
    this.state()
      .valueChange // TODO : pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.value.set(value);
        this.onChange?.(value);
      });

    this.state()
      .complete // TODO : pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.onTouched?.();
      });
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: ChangeFn<string>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.state().disabled.set(isDisabled);
  }
}
