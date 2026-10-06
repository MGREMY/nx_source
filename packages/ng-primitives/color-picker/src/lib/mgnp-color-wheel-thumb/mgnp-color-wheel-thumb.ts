import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { injectMgnpColorWheelConfig } from '../mgnp-color-wheel/mgnp-color-wheel.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorWheelThumbState,
  NgpColorWheelThumb,
  provideColorWheelThumbState,
} from 'ng-primitives/color';

export const mgnpColorWheelThumbVariants = cva(
  'mgnp-color-wheel-thumb group/mgnp-color-wheel-thumb',
  {
    variants: {
      variant: {
        default: 'mgnp-color-wheel-thumb-variant-variant',
        primary: 'mgnp-color-wheel-thumb-variant-primary',
        accent: 'mgnp-color-wheel-thumb-variant-accent',
        info: 'mgnp-color-wheel-thumb-variant-info',
        success: 'mgnp-color-wheel-thumb-variant-success',
        warning: 'mgnp-color-wheel-thumb-variant-warning',
        danger: 'mgnp-color-wheel-thumb-variant-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MgnpColorWheelThumbVariants = VariantProps<typeof mgnpColorWheelThumbVariants>;

@Directive({
  selector: '[mgnpColorWheelThumb]',
  providers: [provideColorWheelThumbState()],
  hostDirectives: [
    {
      directive: NgpColorWheelThumb,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorWheelThumb',
})
export class MgnpColorWheelThumb {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorWheelConfig();
  public readonly state = injectColorWheelThumbState();

  constructor() {
    classes(() =>
      mgnpColorWheelThumbVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
