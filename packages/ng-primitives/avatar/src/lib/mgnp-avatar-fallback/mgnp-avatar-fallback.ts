import { MgnpAvatar } from '../mgnp-avatar/mgnp-avatar';
import { injectAvatarFallbackConfig } from './mgnp-avatar-fallback.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectAvatarFallbackState,
  NgpAvatarFallback,
  provideAvatarFallbackState,
} from 'ng-primitives/avatar';

export const mgnpAvatarFallbackVariants = cva('mgnp-avatar-fallback group/mgnp-avatar-fallback', {
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
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpAvatarFallbackVariants = VariantProps<typeof mgnpAvatarFallbackVariants>;

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

  public readonly config = injectAvatarFallbackConfig();
  public readonly state = injectAvatarFallbackState();

  constructor() {
    classes(() => mgnpAvatarFallbackVariants({ variant: this._avatar.variant() }));
  }
}
