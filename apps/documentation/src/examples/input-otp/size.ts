import { MgnpInputOtp, MgnpInputOtpInput, MgnpInputOtpSlot } from '@mgremy/ng-primitives/input-otp';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpInputOtp, MgnpInputOtpInput, MgnpInputOtpSlot],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 w-full items-center">
      @for (size of _sizes; track $index) {
        <span>{{ size }}</span>
        <div mgnpInputOtp [size]="size">
          <input mgnpInputOtpInput />

          @for (_ of slots(); track $index) {
            <div mgnpInputOtpSlot></div>
          }
        </div>
      }
    </div>
  `,
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class SizeExample {
  readonly _sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  readonly slots = Array.from({ length: 6 }, (_, i) => i);
}
