import { MgnpAvatar, MgnpAvatarCva, MgnpAvatarFallback, MgnpAvatarImage } from '@mgremy/ng-primitives/avatar';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpAvatar, MgnpAvatarFallback, MgnpAvatarImage],
  template: `
    <div class="flex flex-col gap-2 w-full items-center justify-center">
      @for (variant of _variant; track $index) {
        <span>{{ variant }}</span>
        <span mgnpAvatar [variant]="variant">
          <img mgnpAvatarImage alt="John Doe" src="https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_1.png" />
          <span mgnpAvatarFallback>JD</span>
        </span>

        <div class="inline-flex items-center *:not-first:-ml-4">
          @for (count of _count; track $index) {
            <span mgnpAvatar [variant]="variant">
              <img
                mgnpAvatarImage
                alt="John Doe"
                [src]="'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_' + count + '.png'" />
              <span mgnpAvatarFallback>JD</span>
            </span>
          }
        </div>
      }
    </div>
  `,
})
export default class Avatar {
  readonly _count = Array.from({ length: 5 }, (_, i) => i++);
  readonly _variant = [
    'default',
    'primary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
  ] as MgnpAvatarCva['variant'][];
}
