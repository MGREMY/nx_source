import { MgnpColorPicker } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { injectColorFieldState, NgpColorField, provideColorFieldState } from 'ng-primitives/color';

export const [provideMgnpColorFieldConfig, injectMgnpColorFieldConfig] = createMgnpComponentConfig<{
  variant: MgnpColorFieldVariants['variant'];
}>('MgnpColorField', {
  variant: 'default',
});

export const mgnpColorFieldVariants = cva('mgnp-color-field group/mgnp-color-field', {
  variants: {
    variant: {
      default: 'mgnp-color-field-variant-variant',
      primary: 'mgnp-color-field-variant-primary',
      accent: 'mgnp-color-field-variant-accent',
      info: 'mgnp-color-field-variant-info',
      success: 'mgnp-color-field-variant-success',
      warning: 'mgnp-color-field-variant-warning',
      danger: 'mgnp-color-field-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpColorFieldVariants = VariantProps<typeof mgnpColorFieldVariants>;

@Directive({
  selector: '[mgnpColorField]',
  providers: [provideColorFieldState()],
  hostDirectives: [
    {
      directive: NgpColorField,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpColorField',
})
export class MgnpColorField {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorFieldConfig();
  public readonly state = injectColorFieldState();

  public constructor() {
    classes(() =>
      mgnpColorFieldVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
