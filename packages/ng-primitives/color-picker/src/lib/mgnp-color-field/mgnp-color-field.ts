import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { injectColorFieldState, NgpColorField, provideColorFieldState } from 'ng-primitives/color';

export type MgnpColorFieldCva = MgnpColorPickerCva;

export const mgnpColorFieldVariants = cva<MgnpColorFieldCva>(
  'mgnp-color-field group/mgnp-color-field',
  {
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
  }
);

export type MgnpColorFieldVariants = VariantProps<typeof mgnpColorFieldVariants>;

export const [provideMgnpColorFieldConfig, injectMgnpColorFieldConfig] = createMgnpComponentConfig<{
  variant: MgnpColorFieldVariants['variant'];
}>('MgnpColorField', {
  variant: 'default',
});

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
