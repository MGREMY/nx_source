import { MgnpAvatar, MgnpAvatarCva } from '../mgnp-avatar/mgnp-avatar';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAvatarFallbackState,
  NgpAvatarFallback,
  provideAvatarFallbackState,
} from 'ng-primitives/avatar';

export type MgnpAvatarFallbackCva = MgnpAvatarCva;

export const mgnpAvatarFallbackVariants = cva<MgnpAvatarFallbackCva>(
  'mgnp-avatar-fallback group/mgnp-avatar-fallback',
  {
    variants: {
      variant: {
        default: 'mgnp-avatar-fallback-variant-default',
        primary: 'mgnp-avatar-fallback-variant-primary',
        accent: 'mgnp-avatar-fallback-variant-accent',
        info: 'mgnp-avatar-fallback-variant-info',
        success: 'mgnp-avatar-fallback-variant-success',
        warning: 'mgnp-avatar-fallback-variant-warning',
        danger: 'mgnp-avatar-fallback-variant-danger',
      },
    },
  }
);

export type MgnpAvatarFallbackVariants = VariantProps<typeof mgnpAvatarFallbackVariants>;

export const [providMgnpAvatarFallbackConfig, injectMgnpAvatarFallbackConfig] =
  createMgnpComponentConfig<{
    variant: MgnpAvatarFallbackVariants['variant'];
  }>('MgnpAvatarFallback', {
    variant: 'default',
  });

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
