import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { injectMgnpColorWheelConfig } from './mgnp-color-wheel.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { injectColorWheelState, NgpColorWheel, provideColorWheelState } from 'ng-primitives/color';

export const mgnpColorWheelVariants = cva('mgnp-color-wheel group/mgnp-color-wheel', {
  variants: {
    variant: {
      default: 'mgnp-color-wheel-variant-variant',
      primary: 'mgnp-color-wheel-variant-primary',
      accent: 'mgnp-color-wheel-variant-accent',
      info: 'mgnp-color-wheel-variant-info',
      success: 'mgnp-color-wheel-variant-success',
      warning: 'mgnp-color-wheel-variant-warning',
      danger: 'mgnp-color-wheel-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpColorWheelVariants = VariantProps<typeof mgnpColorWheelVariants>;

@Directive({
  selector: '[mgnpColorWheel]',
  providers: [provideColorWheelState()],
  hostDirectives: [
    {
      directive: NgpColorWheel,
      inputs: [
        'ngpColorWheelValue:mgnpColorWheelValue',
        'ngpColorWheelDefaultValue:mgnpColorWheelDefaultValue',
        'ngpColorWheelColorSpace:mgnpColorWheelColorSpace',
        'ngpColorWheelDisabled:mgnpColorWheelDisabled',
      ],
      outputs: ['ngpColorWheelValueChange:mgnpColorWheelValueChange'],
    },
  ],
  exportAs: 'mgnpColorWheel',
})
export class MgnpColorWheel {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorWheelConfig();
  public readonly state = injectColorWheelState();

  public constructor() {
    classes(() =>
      mgnpColorWheelVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
