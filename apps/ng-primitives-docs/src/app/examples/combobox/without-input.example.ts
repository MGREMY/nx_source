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
    NgpComboboxButton,
    NgpComboboxPortal,
    NgpComboboxDropdown,
    NgpComboboxOption,
    MgnpCombobox,
    MgnpComboboxDropdown,
    MgnpComboboxOption,
    MgnpButton,
  ],
  template: `
    <div
      ngpCombobox
      mgnpCombobox
      [(ngpComboboxValue)]="selectedOption">
      <button
        ngpComboboxButton
        mgnpButton>
        {{ selectedOption() || 'Select an option' }} ▼
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
