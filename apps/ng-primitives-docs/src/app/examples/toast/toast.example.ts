import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpToast } from '@mgremy/ng-primitives/toast';

import { Component, inject, TemplateRef } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { NgpToast, NgpToastManager } from 'ng-primitives/toast';

@Component({
  imports: [NgpButton, NgpToast, MgnpButton, MgnpToast],
  template: `
    <button ngpButton mgnpButton (click)="show(toast)">Show toast</button>

    <ng-template #toast let-dismiss="dismiss">
      <div ngpToast mgnpToast>
        <div class="flex flex-col gap-1">
          <p class="text-lg font-semibold text-ui transition-colors">This is a toast message</p>
          <p class="text-ui-secondary transition-colors">It will disappear in 3 seconds</p>
        </div>
        <button (click)="dismiss()" ngpButton mgnpButton variant="outline">Dismiss</button>
      </div>
    </ng-template>
  `,
})
export default class ToastExample {
  private readonly ngpToastManager = inject(NgpToastManager);

  show(toast: TemplateRef<void>): void {
    this.ngpToastManager.show(toast, { placement: 'bottom-end', duration: 100000 });
  }
}
