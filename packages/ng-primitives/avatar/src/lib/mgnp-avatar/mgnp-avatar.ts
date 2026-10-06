import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { injectAvatarState, NgpAvatar, provideAvatarState } from 'ng-primitives/avatar';

export type MgnpAvatarCva = {
  variant: {
    default: ClassValue;
    primary: ClassValue;
    accent: ClassValue;
    info: ClassValue;
    success: ClassValue;
    warning: ClassValue;
    danger: ClassValue;
  };
};

export const [providMgnpAvatarConfig, injectMgnpAvatarConfig] = createMgnpComponentConfig<{
  variant: MgnpAvatarVariants['variant'];
}>('MgnpAvatar', {
  variant: 'default',
});

export const mgnpAvatarVariants = cva<MgnpAvatarCva>('mgnp-avatar group/mgnp-avatar', {
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

  public constructor() {
    classes(() => mgnpAvatarVariants({ variant: this.variant() }));
  }
}
