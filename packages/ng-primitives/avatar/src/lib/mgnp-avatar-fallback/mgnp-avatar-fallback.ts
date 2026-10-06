import { MgnpAvatar, MgnpAvatarCva } from '../mgnp-avatar/mgnp-avatar';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectAvatarFallbackState,
  NgpAvatarFallback,
  provideAvatarFallbackState,
} from 'ng-primitives/avatar';

export type MgnpAvatarFallbackCva = MgnpAvatarCva;

export const [
  mgnpAvatarFallbackVariants,
  provideMgnpAvatarFallbackConfig,
  injectMgnpAvatarFallbackConfig,
] = createMgnpComponent<MgnpAvatarCva>('avatar-fallback', { variant: 'default' });

@Directive({
  selector: '[mgnpAvatarFallback]',
  providers: [provideAvatarFallbackState()],
  hostDirectives: [
    {
      directive: NgpAvatarFallback,
      inputs: ['ngpAvatarFallbackDelay:mgnpAvatarFallbackDelay'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAvatarFallback',
})
export class MgnpAvatarFallback {
  private readonly _avatar = inject(MgnpAvatar);

  public readonly config = injectMgnpAvatarFallbackConfig();
  public readonly state = injectAvatarFallbackState();

  public constructor() {
    classes(() => mgnpAvatarFallbackVariants({ variant: this._avatar.variant() }));
  }
}
