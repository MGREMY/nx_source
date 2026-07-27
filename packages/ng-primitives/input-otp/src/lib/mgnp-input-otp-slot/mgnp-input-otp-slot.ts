import { MgnpInputOtp } from '../mgnp-input-otp/mgnp-input-otp';

import { Directive, inject } from '@angular/core';
import { NgpInputOtpSlot } from 'ng-primitives/input-otp';

@Directive({
  selector: '[mgnpInputOtpSlot]',
  providers: [],
  host: {
    class: 'mgnp-input-otp-slot mgnp-c-input-otp-slot',
    'data-mgnp-input-otp-slot': '',
    '[attr.data-mgnp-input-otp-slot-color]': 'otp.color()',
    '[attr.data-mgnp-input-otp-slot-size]': 'otp.size()',
  },
  hostDirectives: [
    {
      directive: NgpInputOtpSlot,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpInputOtpSlot',
})
export class MgnpInputOtpSlot {
  protected readonly otp = inject(MgnpInputOtp);
}
