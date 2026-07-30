import { MgnpInputOtp, MgnpInputOtpInput, MgnpInputOtpSlot } from '@mgremy/ng-primitives/input-otp';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpInputOtp, MgnpInputOtpInput, MgnpInputOtpSlot],
  template: `
    <div class="grid grid-rows-2 gap-y-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span class="place-self-center">{{ color }}</span>
        <div class="place-self-center" mgnpInputOtp [color]="color">
          <input mgnpInputOtpInput />

          @for (_ of slots; track $index) {
            <div mgnpInputOtpSlot></div>
          }
        </div>
      }
    </div>
  `,
})
export default class InputOtp {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
  readonly slots = Array.from({ length: 6 }, (_, i) => i);
}
