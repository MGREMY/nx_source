import { Directive } from '@angular/core';
import { injectComboboxState, NgpCombobox, provideComboboxState } from 'ng-primitives/combobox';

@Directive({
  selector: '[mgnpCombobox]',
  standalone: true,
  providers: [provideComboboxState()],
  host: {
    'data-mgnp-component': 'mgnp-combobox',
  },
  hostDirectives: [
    {
      directive: NgpCombobox,
      inputs: [
        'ngpComboboxValue:value',
        'ngpComboboxMultiple:multiple',
        'ngpComboboxDisabled:disabled',
        'ngpComboboxAllowDeselect:allowDeselect',
        'ngpComboboxCompareWith:compareWith',
        'ngpComboboxDropdownPlacement:dropdownPlacement',
        'ngpComboboxDropdownContainer:dropdownContainer',
        'ngpComboboxDropdownFlip:dropdownFlip',
        'ngpComboboxDropdownOffset:dropdownOffset',
        'ngpComboboxScrollToOption:scrollToOption',
        'ngpComboboxOptions:options',
      ],
      outputs: ['ngpComboboxValueChange:valueChange', 'ngpComboboxOpenChange:openChange'],
    },
  ],
  exportAs: 'mgnpCombobox',
})
export class MgnpCombobox {
  protected readonly state = injectComboboxState();
}
