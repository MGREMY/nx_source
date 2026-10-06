import { mgnpColorAreaVariants } from '../mgnp-color-area/mgnp-color-area';
import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { injectMgnpColorAreaThumbConfig } from './mgnp-color-area-thumb.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectColorAreaThumbState,
  NgpColorAreaThumb,
  provideColorAreaThumbState,
} from 'ng-primitives/color';

export const mgnpColorAreaThumbVariants = cva('mgnp-color-area-thumb group/mgnp-color-area-thumb', {
  variants: {
    variant: {
      default: 'mgnp-color-area-thumb-variant-default',
      primary: 'mgnp-color-area-thumb-variant-primary',
      accent: 'mgnp-color-area-thumb-variant-accent',
      info: 'mgnp-color-area-thumb-variant-info',
      success: 'mgnp-color-area-thumb-variant-success',
      warning: 'mgnp-color-area-thumb-variant-warning',
      danger: 'mgnp-color-area-thumb-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpColorAreaThumbVariants = VariantProps<typeof mgnpColorAreaVariants>;

@Directive({
  selector: '[mgnpColorAreaThumb]',
  providers: [provideColorAreaThumbState()],
  hostDirectives: [
    {
      directive: NgpColorAreaThumb,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorAreaThumb',
})
export class MgnpColorAreaThumb {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorAreaThumbConfig();
  public readonly state = injectColorAreaThumbState();

  public constructor() {
    classes(() =>
      mgnpColorAreaThumbVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
