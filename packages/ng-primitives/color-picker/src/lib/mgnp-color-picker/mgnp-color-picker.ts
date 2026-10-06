import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import {
  Color,
  injectColorPickerState,
  NgpColorPicker,
  provideColorPickerState,
} from 'ng-primitives/color';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpColorPickerCva = {
  variant: {
    default: ClassValue;
    primary: ClassValue;
    accent: ClassValue;
    info: ClassValue;
    success: ClassValue;
    warning: ClassValue;
    danger: ClassValue;
  };
};

export const mgnpColorPickerVariants = cva<MgnpColorPickerCva>(
  'mgnp-color-picker group/mgnp-color-picker',
  {
    variants: {
      variant: {
        default: 'mgnp-color-picker-variant-variant',
        primary: 'mgnp-color-picker-variant-primary',
        accent: 'mgnp-color-picker-variant-accent',
        info: 'mgnp-color-picker-variant-info',
        success: 'mgnp-color-picker-variant-success',
        warning: 'mgnp-color-picker-variant-warning',
        danger: 'mgnp-color-picker-variant-danger',
      },
    },
  }
);

export type MgnpColorPickerVariants = VariantProps<typeof mgnpColorPickerVariants>;

export const [provideMgnpColorPickerConfig, injectMgnpColorPickerConfig] =
  createMgnpComponentConfig<{
    variant: MgnpColorPickerVariants['variant'];
  }>('MgnpColorPicker', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpColorPicker]',
  providers: [provideColorPickerState(), provideValueAccessor(MgnpColorPicker)],
  host: {
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpColorPicker,
      inputs: [
        'ngpColorPickerValue:mgnpColorPickerValue',
        'ngpColorPickerDefaultValue:mgnpColorPickerDefaultValue',
      ],
      outputs: ['ngpColorPickerValueChange:mgnpColorPickerValueChange'],
    },
  ],
  exportAs: 'mgnpColorPicker',
})
export class MgnpColorPicker implements ControlValueAccessor {
  public readonly config = injectMgnpColorPickerConfig();
  public readonly state = injectColorPickerState();

  protected onChangeFn?: ChangeFn<Color>;
  protected onTouchedFn?: TouchedFn;

  public readonly variant = input<MgnpColorPickerVariants['variant']>(this.config.variant);

  public constructor() {
    classes(() => mgnpColorPickerVariants({ variant: this.variant() }));

    this.state()
      .valueChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  public writeValue(value: Color | string): void {
    if (typeof value === 'string') this.state().setValue(Color.parse(value));
    else this.state().setValue(value);
  }

  public registerOnChange(fn: ChangeFn<Color>): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }
}
