import { MgnpButton } from '@mgremy/ng-primitives/button';
import {
  MgnpDialog,
  MgnpDialogDescription,
  MgnpDialogOverlay,
  MgnpDialogTitle,
  MgnpDialogTrigger,
} from '@mgremy/ng-primitives/dialog';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton, MgnpDialogTrigger, MgnpDialog, MgnpDialogDescription, MgnpDialogOverlay, MgnpDialogTitle],
  template: `
    <button mgnpButton [mgnpDialogTrigger]="dialog">Launch Dialog</button>

    <ng-template #dialog let-close="close">
      <div mgnpDialogOverlay>
        <div mgnpDialog>
          <h1 mgnpDialogTitle>Publish this article?</h1>
          <p mgnpDialogDescription>Are you sure you want to publish this article? This action is irreversible.</p>
          <div class="flex gap-2 justify-end items-center mt-4">
            <button (click)="close()" mgnpButton variant="outline" color="danger">Cancel</button>
            <button (click)="close()" mgnpButton color="success">Confirm</button>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  providers: [],
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class DialogExample {}
