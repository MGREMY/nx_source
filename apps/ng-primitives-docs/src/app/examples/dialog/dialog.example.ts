import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpDialog, MgnpDialogDescription, MgnpDialogOverlay, MgnpDialogTitle } from '@mgremy/ng-primitives/dialog';

import { Component } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import {
  NgpDialog,
  NgpDialogDescription,
  NgpDialogOverlay,
  NgpDialogTitle,
  NgpDialogTrigger,
} from 'ng-primitives/dialog';

@Component({
  imports: [
    MgnpButton,
    MgnpDialog,
    MgnpDialogDescription,
    MgnpDialogOverlay,
    MgnpDialogTitle,
    NgpButton,
    NgpDialog,
    NgpDialogOverlay,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogTrigger,
  ],
  template: `
    <button [ngpDialogTrigger]="dialog" ngpButton mgnpButton>Launch Dialog</button>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay mgnpDialogOverlay>
        <div ngpDialog mgnpDialog>
          <h1 ngpDialogTitle mgnpDialogTitle>Publish this article?</h1>
          <p ngpDialogDescription mgnpDialogDescription>
            Are you sure you want to publish this article? This action is irreversible.
          </p>
          <div class="flex gap-2 justify-end items-center mt-4">
            <button (click)="close()" ngpButton mgnpButton variant="outline" color="danger">Cancel</button>
            <button (click)="close()" ngpButton mgnpButton color="success">Confirm</button>
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
