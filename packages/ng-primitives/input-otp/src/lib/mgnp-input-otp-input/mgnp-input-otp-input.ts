import { MgnpInputOtp } from '../mgnp-input-otp/mgnp-input-otp';

import { Directive, inject } from '@angular/core';
import { NgpInputOtpInput } from 'ng-primitives/input-otp';

@Directive({
  selector: '[mgnpInputOtpInput]',
  providers: [],
  host: {
    class: 'mgnp-input-otp-input mgnp-c-input-otp-input',
    'data-mgnp-input-otp-input': '',
    '[attr.data-mgnp-input-otp-input-color]': 'otp.color()',
    '[attr.data-mgnp-input-otp-input-size]': 'otp.size()',
  },
  hostDirectives: [
    {
      directive: NgpInputOtpInput,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpInputOtpInput',
})
export class MgnpInputOtpInput {
  protected readonly otp = inject(MgnpInputOtp);
}
