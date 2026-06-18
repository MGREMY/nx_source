import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { NgpDialogOverlay, provideDialogState } from 'ng-primitives/dialog';

export type MgnpDialogOverlayMode = PropertyType<'modal' | 'drawer'>;

export type MgnpDialogDrawerPosition = PropertyType<'start' | 'end'>;

@Directive({
  selector: '[mgnpDialogOverlay]',
  standalone: true,
  providers: [provideDialogState()],
  host: {
    class: 'mgnp-dialog-overlay mgnp-c-dialog-overlay',
    'data-mgnp-dialog-overlay': '',
    '[attr.data-mgnp-dialog-overlay-mode]': 'mode()',
    '[attr.data-mgnp-dialog-overlay-position]': 'drawerPosition()',
  },
  hostDirectives: [
    {
      directive: NgpDialogOverlay,
      inputs: ['ngpDialogOverlayCloseOnClick:closeOnClick'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDialogOverlay',
})
export class MgnpDialogOverlay {
  readonly mode = input<MgnpDialogOverlayMode>('modal');
  readonly drawerPosition = input<MgnpDialogDrawerPosition>('end');
}
