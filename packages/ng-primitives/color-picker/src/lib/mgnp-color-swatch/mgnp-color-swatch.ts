import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorSwatchState,
  NgpColorSwatch,
  provideColorSwatchState,
} from 'ng-primitives/color';

export const [provideMgnpColorSwatchConfig, injectMgnpColorSwatchConfig] =
  createMgnpComponentConfig<{
    variant: MgnpColorSwatchVariants['variant'];
  }>('MgnpColorSwatch', {
    variant: 'default',
  });

export const mgnpColorSwatchVariants = cva('mgnp-color-swatch group/mgnp-color-swatch', {
  variants: {
    variant: {
      default: 'mgnp-color-swatch-variant-variant',
      primary: 'mgnp-color-swatch-variant-primary',
      accent: 'mgnp-color-swatch-variant-accent',
      info: 'mgnp-color-swatch-variant-info',
      success: 'mgnp-color-swatch-variant-success',
      warning: 'mgnp-color-swatch-variant-warning',
      danger: 'mgnp-color-swatch-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpColorSwatchVariants = VariantProps<typeof mgnpColorSwatchVariants>;

@Directive({
  selector: '[mgnpColorSwatch]',
  providers: [provideColorSwatchState()],
  hostDirectives: [
    {
      directive: NgpColorSwatch,
      inputs: ['ngpColorSwatch:mgnpColorSwatch', 'ngpColorSwatchLabel:mgnpColorSwatchLabel'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorSwatch',
})
export class MgnpColorSwatch {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorSwatchConfig();
  public readonly state = injectColorSwatchState();

  public constructor() {
    classes(() =>
      mgnpColorSwatchVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
