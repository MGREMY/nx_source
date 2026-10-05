import { MgnpAvatar } from '../mgnp-avatar/mgnp-avatar';
import { injectAvatarImageConfig } from './mgnp-avatar-image.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAvatarImageState,
  NgpAvatarImage,
  provideAvatarImageState,
} from 'ng-primitives/avatar';

export const mgnpAvatarImageVariants = cva('mgnp-avatar-image group/mgnp-avatar-image', {
  variants: {
    variant: {
      default: 'mgnp-avatar-image-variant-default',
      primary: 'mgnp-avatar-image-variant-primary',
      accent: 'mgnp-avatar-image-variant-accent',
      info: 'mgnp-avatar-image-variant-info',
      success: 'mgnp-avatar-image-variant-success',
      warning: 'mgnp-avatar-image-variant-warning',
      danger: 'mgnp-avatar-image-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpAvatarImageVariants = VariantProps<typeof mgnpAvatarImageVariants>;

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
  protected readonly _avatar = inject(MgnpAvatar);

  public readonly state = injectAvatarImageState();
  public readonly config = injectAvatarImageConfig();

  constructor() {
    classes(() => mgnpAvatarImageVariants({ variant: this._avatar.variant() }));
  }
}
