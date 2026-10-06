import { injectMgnpButtonConfig } from './mgnp-button.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { injectButtonState, NgpButton, provideButtonState } from 'ng-primitives/button';

export const mgnpButtonVariants = cva('mgnp-button group/mgnp-button', {
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
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type MgnpButtonVariants = VariantProps<typeof mgnpButtonVariants>;

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

  public readonly variant = input<MgnpButtonVariants['variant']>('default');
  public readonly size = input<MgnpButtonVariants['size']>('md');

  constructor() {
    classes(() => mgnpButtonVariants({ variant: this.variant(), size: this.size() }));
  }
}
