import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Color,
  injectColorPickerState,
  NgpColorPicker,
  provideColorPickerState,
} from 'ng-primitives/color';
import { provideValueAccessor } from 'ng-primitives/utils';

export type MgnpColorPickerColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpColorPicker]',
  providers: [provideColorPickerState(), provideValueAccessor(MgnpColorPicker)],
  host: {
    class: 'mgnp-color-picker mgnp-c-color-picker',
    'data-mgnp-color-picker': '',
    '[attr.data-mgnp-color-picker-color]': 'color()',
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
export class MgnpColorPicker extends MgnpValueAccessor<Color> {
  readonly state = injectColorPickerState();

  readonly color = input<MgnpColorPickerColor>('ui');

  constructor() {
    super();

    this.state()
      .valueChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));
  }

  writeValue(value: Color | string): void {
    if (typeof value === 'string') this.state().setValue(Color.parse(value));
    else this.state().setValue(value);
  }
}
