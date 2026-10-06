import { MgnpAvatar, MgnpAvatarCva } from '../mgnp-avatar/mgnp-avatar';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectAvatarImageState,
  NgpAvatarImage,
  provideAvatarImageState,
} from 'ng-primitives/avatar';

export type MgnpAvatarImageCva = MgnpAvatarCva;

export const [mgnpAvatarImageVariants, provideMgnpAvatarImageConfig, injectMgnpAvatarImageConfig] =
  createMgnpComponent<MgnpAvatarImageCva>('avatar-image', { variant: 'default' });

@Directive({
  selector: '[mgnpAvatarImage]',
  providers: [provideAvatarImageState()],
  hostDirectives: [
    {
      directive: NgpAvatarImage,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAvatarImage',
})
export class MgnpAvatarImage {
  private readonly _avatar = inject(MgnpAvatar);

  public readonly config = injectMgnpAvatarImageConfig();
  public readonly state = injectAvatarImageState();

  public constructor() {
    classes(() => mgnpAvatarImageVariants({ variant: this._avatar.variant() }));
  }
}
