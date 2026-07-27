import { MgnpInputOtp, MgnpInputOtpInput, MgnpInputOtpSlot } from '@mgremy/ng-primitives/input-otp';

import { Component, computed, signal } from '@angular/core';

@Component({
  imports: [MgnpInputOtp, MgnpInputOtpInput, MgnpInputOtpSlot],
  template: `
    <div class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 w-full items-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <div mgnpInputOtp [color]="color" [(mgnpInputOtpValue)]="value">
          <input mgnpInputOtpInput />

          @for (_ of slots(); track $index) {
            <div mgnpInputOtpSlot></div>
          }
        </div>
      }
    </div>
  `,
})
export default class InputOtp {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];

  readonly value = signal<string>('');
  readonly length = signal<number>(6);

  readonly slots = computed(() => Array.from({ length: this.length() }, (_, i) => i));
}
