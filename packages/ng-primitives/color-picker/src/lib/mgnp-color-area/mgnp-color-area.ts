import { MgnpColorPicker, MgnpColorPickerCva } from '../mgnp-color-picker/mgnp-color-picker';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { injectColorAreaState, NgpColorArea, provideColorAreaState } from 'ng-primitives/color';

export type MgnpColorAreaCva = MgnpColorPickerCva;

export const mgnpColorAreaVariants = cva<MgnpColorAreaCva>(
  'mgnp-color-area group/mgnp-color-area',
  {
    variants: {
      variant: {
        default: 'mgnp-color-area-variant-default',
        primary: 'mgnp-color-area-variant-primary',
        accent: 'mgnp-color-area-variant-accent',
        info: 'mgnp-color-area-variant-info',
        success: 'mgnp-color-area-variant-success',
        warning: 'mgnp-color-area-variant-warning',
        danger: 'mgnp-color-area-variant-danger',
      },
    },
  }
);

export type MgnpColorAreaVariants = VariantProps<typeof mgnpColorAreaVariants>;

export const [provideMgnpColorAreaConfig, injectMgnpColorAreaConfig] = createMgnpComponentConfig<{
  variant: MgnpColorAreaVariants['variant'];
}>('MgnpColorArea', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpColorArea]',
  providers: [provideColorAreaState()],
  hostDirectives: [
    {
      directive: NgpColorArea,
      inputs: [
        'ngpColorAreaValue:mgnpColorAreaValue',
        'ngpColorAreaDefaultValue:mgnpColorAreaDefaultValue',
        'ngpColorAreaXChannel:mgnpColorAreaXChannel',
        'ngpColorAreaYChannel:mgnpColorAreaYChannel',
        'ngpColorAreaColorSpace:mgnpColorAreaColorSpace',
        'ngpColorAreaDisabled:mgnpColorAreaDisabled',
      ],
      outputs: ['ngpColorAreaValueChange:mgnpColorAreaValueChange'],
    },
  ],
  exportAs: 'mgnpColorArea',
})
export class MgnpColorArea {
  private readonly _colorPicker = inject(MgnpColorPicker, { optional: true });

  public readonly config = injectMgnpColorAreaConfig();
  public readonly state = injectColorAreaState();

  public constructor() {
    classes(() =>
      mgnpColorAreaVariants({ variant: this._colorPicker?.variant() ?? this.config.variant })
    );
  }
}
