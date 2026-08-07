import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectCheckboxState, NgpCheckbox, provideCheckboxState } from 'ng-primitives/checkbox';
import { provideValueAccessor } from 'ng-primitives/utils';

export type MgnpCheckboxColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

export type MgnpCheckboxSize = PropertyType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

@Directive({
  selector: `[mgnpCheckbox]`,
  providers: [provideCheckboxState(), provideValueAccessor(MgnpCheckbox)],
  host: {
    class: 'mgnp-checkbox mgnp-c-checkbox',
    'data-mgnp-checkbox': '',
    '[attr.data-mgnp-checkbox-size]': 'size()',
    '[attr.data-mgnp-checkbox-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpCheckbox,
      inputs: [
        'ngpCheckboxChecked:mgnpCheckboxChecked',
        'ngpCheckboxDefaultChecked:mgnpCheckboxDefaultChecked',
        'ngpCheckboxIndeterminate:mgnpCheckboxIndeterminate',
        'ngpCheckboxRequired:mgnpCheckboxRequired',
        'ngpCheckboxDisabled:mgnpCheckboxDisabled',
      ],
      outputs: [
        'ngpCheckboxCheckedChange:mgnpCheckboxCheckedChange',
        'ngpCheckboxIndeterminateChange:mgnpCheckboxIndeterminateChange',
      ],
    },
  ],
  exportAs: 'mgnpCheckbox',
})
export class MgnpCheckbox extends MgnpValueAccessor<boolean> {
  readonly state = injectCheckboxState();

  readonly color = input<MgnpCheckboxColor>('ui');
  readonly size = input<MgnpCheckboxSize>('md');

  constructor() {
    super();

    this.state()
      .checkedChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));
  }

  writeValue(value: boolean): void {
    this.state().setChecked(value);
  }

  override setDisabledState(value: boolean): void {
    this.state().setDisabled(value);
  }
}
