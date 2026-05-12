import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, inject, input } from '@angular/core';
import { NgpDialogOverlay } from 'ng-primitives/dialog';

const options = ['ngpDialogOverlay'];

const error = new Error(`MgnpDialogOverlay must be used with ${options.join(' / ')}`);

export type MgnpDialogOverlayMode = PropertyType<'modal' | 'drawer'>;

export type MgnpDialogDrawerPosition = PropertyType<'start' | 'end'>;

@Directive({
  selector: '[ngpDialogOverlay][mgnpDialogOverlay]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-dialog-overlay',
    '[attr.data-mgnp-mode]': 'mode()',
    '[attr.data-mgnp-drawer-position]': 'drawerPosition()',
  },
})
export class MgnpDialogOverlay {
  private readonly _ngpDialogOverlay = inject(NgpDialogOverlay, { optional: true });

  readonly mode = input<MgnpDialogOverlayMode>('modal');
  readonly drawerPosition = input<MgnpDialogDrawerPosition>('end');

  constructor() {
    if (!this._ngpDialogOverlay) {
      console.error(this);
      throw error;
    }
  }
}
