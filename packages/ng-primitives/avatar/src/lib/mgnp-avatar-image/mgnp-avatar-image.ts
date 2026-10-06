import { MgnpAvatar, MgnpAvatarCva } from '../mgnp-avatar/mgnp-avatar';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAvatarImageState,
  NgpAvatarImage,
  provideAvatarImageState,
} from 'ng-primitives/avatar';

export type MgnpAvatarImageCva = MgnpAvatarCva;

export const mgnpAvatarImageVariants = cva<MgnpAvatarCva>(
  'mgnp-avatar-image group/mgnp-avatar-image',
  {
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
  }
);

export type MgnpAvatarImageVariants = VariantProps<typeof mgnpAvatarImageVariants>;

export const [providMgnpAvatarImageConfig, injectMgnpAvatarImageConfig] =
  createMgnpComponentConfig<{
    variant: MgnpAvatarImageVariants['variant'];
  }>('MgnpAvatarImage', {
    variant: 'default',
  });

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
