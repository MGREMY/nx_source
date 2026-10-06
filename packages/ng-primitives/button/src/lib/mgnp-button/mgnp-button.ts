import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { injectButtonState, NgpButton, provideButtonState } from 'ng-primitives/button';

export type MgnpButtonCva = {
  variant: {
    default: ClassValue;
    ghost: ClassValue;
    primary: ClassValue;
    accent: ClassValue;
    info: ClassValue;
    success: ClassValue;
    warning: ClassValue;
    danger: ClassValue;
  };
  size: {
    xs: ClassValue;
    sm: ClassValue;
    md: ClassValue;
    lg: ClassValue;
    xl: ClassValue;
  };
};

export const mgnpButtonVariants = cva<MgnpButtonCva>('mgnp-button group/mgnp-button', {
  variants: {
    variant: {
      default: 'mgnp-button-variant-default',
      ghost: 'mgnp-button-variant-ghost',
      primary: 'mgnp-button-variant-primary',
      accent: 'mgnp-button-variant-accent',
      info: 'mgnp-button-variant-info',
      success: 'mgnp-button-variant-success',
      warning: 'mgnp-button-variant-warning',
      danger: 'mgnp-button-variant-danger',
    },
    size: {
      xs: 'mgnp-button-size-xs',
      sm: 'mgnp-button-size-sm',
      md: 'mgnp-button-size-md',
      lg: 'mgnp-button-size-lg',
      xl: 'mgnp-button-size-xl',
    },
  },
});

export type MgnpButtonVariants = VariantProps<typeof mgnpButtonVariants>;

export const [provideMgnpButtonConfig, injectMgnpButtonConfig] = createMgnpComponentConfig<{
  variant: MgnpButtonVariants['variant'];
  size: MgnpButtonVariants['size'];
}>('MgnpButtonConfig', {
  variant: 'default',
  size: 'md',
});

@Directive({
  selector: `[mgnpButton]`,
  providers: [provideButtonState()],
  hostDirectives: [
    {
      directive: NgpButton,
      inputs: ['disabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpButton',
})
export class MgnpButton {
  public readonly config = injectMgnpButtonConfig();
  public readonly state = injectButtonState();

  public readonly variant = input<MgnpButtonVariants['variant']>(this.config.variant);
  public readonly size = input<MgnpButtonVariants['size']>(this.config.size);

  public constructor() {
    classes(() => mgnpButtonVariants({ variant: this.variant(), size: this.size() }));
  }
}
