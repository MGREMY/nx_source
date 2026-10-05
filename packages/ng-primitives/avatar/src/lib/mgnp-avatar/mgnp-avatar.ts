import { injectMgnpAvatarConfig } from './mgnp-avatar.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { injectAvatarState, NgpAvatar, provideAvatarState } from 'ng-primitives/avatar';

export const mgnpAvatarVariants = cva('mgnp-avatar group/mgnp-avatar', {
  variants: {
    variant: {
      default: 'mgnp-avatar-variant-default',
      primary: 'mgnp-avatar-variant-primary',
      accent: 'mgnp-avatar-variant-accent',
      info: 'mgnp-avatar-variant-info',
      success: 'mgnp-avatar-variant-success',
      warning: 'mgnp-avatar-variant-warning',
      danger: 'mgnp-avatar-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpAvatarVariants = VariantProps<typeof mgnpAvatarVariants>;

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

  public readonly variant = input<MgnpAvatarVariants['variant']>(this.config.variant);

  constructor() {
    classes(() => mgnpAvatarVariants({ variant: this.variant() }));
  }
}
