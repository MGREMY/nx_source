import { MgnpButton } from '@mgremy/ng-primitives/button';
import {
  MgnpCombobox,
  MgnpComboboxDropdown,
  MgnpComboboxInput,
  MgnpComboboxOption,
} from '@mgremy/ng-primitives/combobox';

import { Component, signal } from '@angular/core';
import {
  NgpCombobox,
  NgpComboboxButton,
  NgpComboboxDropdown,
  NgpComboboxInput,
  NgpComboboxOption,
  NgpComboboxPortal,
} from 'ng-primitives/combobox';

@Component({
  imports: [
    NgpCombobox,
    NgpComboboxInput,
    NgpComboboxButton,
    NgpComboboxPortal,
    NgpComboboxDropdown,
    NgpComboboxOption,
    MgnpCombobox,
    MgnpComboboxInput,
    MgnpComboboxDropdown,
    MgnpComboboxOption,
    MgnpButton,
  ],
  template: `
    <div
      ngpCombobox
      mgnpCombobox
      [(ngpComboboxValue)]="selectedOption">
      <input
        ngpComboboxInput
        mgnpComboboxInput
        [value]="selectedOption()" />
      <button
        ngpComboboxButton
        mgnpButton>
        ▼
      </button>
      <div
        *ngpComboboxPortal
        ngpComboboxDropdown
        mgnpComboboxDropdown>
        @for (option of options; track option) {
          <div
            ngpComboboxOption
            mgnpComboboxOption
            [ngpComboboxOptionValue]="option">
            {{ option }}
          </div>
        }
      </div>
    </div>
  `,
})
export default class ComboboxExample {
  readonly options = ['option 1', 'option 2', 'option 3'];
  readonly selectedOption = signal<string>('');
}
