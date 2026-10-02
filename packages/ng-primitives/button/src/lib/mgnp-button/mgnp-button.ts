import { injectMgnpButtonConfig } from './mgnp-button.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input, signal } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { injectButtonState, NgpButton, provideButtonState } from 'ng-primitives/button';

export const buttonVariants = cva('mgnp-button', {
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

export type ButtonVariants = VariantProps<typeof buttonVariants>;

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

  private readonly _additionalClasses = signal<ClassValue>('');

  public readonly variant = input<ButtonVariants['variant']>('default');
  public readonly size = input<ButtonVariants['size']>('md');

  constructor() {
    classes(() => [
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this._additionalClasses(),
    ]);
  }

  setClass(classes: ClassValue): void {
    this._additionalClasses.set(classes);
  }
}
