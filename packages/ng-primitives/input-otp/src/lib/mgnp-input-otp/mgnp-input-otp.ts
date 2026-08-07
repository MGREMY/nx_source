import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectInputOtpState, NgpInputOtp, provideInputOtpState } from 'ng-primitives/input-otp';
import { provideValueAccessor } from 'ng-primitives/utils';

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
export class MgnpInputOtp extends MgnpValueAccessor<string> {
  readonly state = injectInputOtpState();

  readonly color = input<MgnpInputOtpColor>('ui');
  readonly size = input<MgnpInputOtpSize>('md');

  constructor() {
    super();

    this.state()
      .valueChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));

    this.state()
      .complete.pipe(takeUntilDestroyed())
      .subscribe(() => this.formHandler.onTouchedFn()?.());
  }

  writeValue(value: string | null | undefined): void {
    this.state().updateValue(value ?? '');
  }
}
