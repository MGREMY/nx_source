import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectComboboxState, NgpCombobox, provideComboboxState } from 'ng-primitives/combobox';
import { provideValueAccessor } from 'ng-primitives/utils';

export type MgnpComboboxColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpCombobox]',
  providers: [provideComboboxState(), provideValueAccessor(MgnpCombobox)],
  host: {
    class: 'mgnp-combobox mgnp-c-combobox',
    'data-mgnp-combobox': '',
    '[attr.data-mgnp-combobox-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpCombobox,
      inputs: [
        'ngpComboboxValue:mgnpComboboxValue',
        'ngpComboboxMultiple:mgnpComboboxMultiple',
        'ngpComboboxDisabled:mgnpComboboxDisabled',
        'ngpComboboxAllowDeselect:mgnpComboboxAllowDeselect',
        'ngpComboboxCompareWith:mgnpComboboxCompareWith',
        'ngpComboboxDropdownPlacement:mgnpComboboxDropdownPlacement',
        'ngpComboboxDropdownContainer:mgnpComboboxDropdownContainer',
        'ngpComboboxDropdownFlip:mgnpComboboxDropdownFlip',
        'ngpComboboxDropdownOffset:mgnpComboboxDropdownOffset',
        'ngpComboboxScrollToOption:mgnpComboboxScrollToOption',
        'ngpComboboxOptions:mgnpComboboxOptions',
      ],
      outputs: [
        'ngpComboboxValueChange:mgnpComboboxValueChange',
        'ngpComboboxOpenChange:mgnpComboboxOpenChange',
      ],
    },
  ],
  exportAs: 'mgnpCombobox',
})
export class MgnpCombobox<T> extends MgnpValueAccessor<T | undefined> {
  readonly state = injectComboboxState();

  readonly color = input<MgnpComboboxColor>('ui');

  constructor() {
    super();

    this.state()
      .valueChange // TODO : pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));
  }

  writeValue(value: T): void {
    this.state().value.set(value);
  }

  override setDisabledState(value: boolean): void {
    this.state().disabled.set(value);
  }
}
