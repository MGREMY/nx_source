import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { injectAvatarState, NgpAvatar, provideAvatarState } from 'ng-primitives/avatar';

export type MgnpAvatarCva = {
  variant: 'default' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
};

export const [mgnpAvatarVariants, provideMgnpAvatarConfig, injectMgnpAvatarConfig] =
  createMgnpComponent<MgnpAvatarCva>('avatar', { variant: 'default' });

@Directive({
  selector: '[mgnpAvatar]',
  providers: [provideAvatarState()],
  hostDirectives: [
    {
      directive: NgpAvatar,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAvatar',
})
export class MgnpAvatar {
  public readonly config = injectMgnpAvatarConfig();
  public readonly state = injectAvatarState();

  public readonly variant = input<MgnpAvatarCva['variant']>(this.config.variant);

  public constructor() {
    classes(() => mgnpAvatarVariants({ variant: this.variant() }));
  }
}
