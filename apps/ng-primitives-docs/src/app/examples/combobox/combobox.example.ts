import {
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxInput,
  MgnpComboboxOption,
  MgnpComboboxPortal,
} from '@mgremy/ng-primitives/combobox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { Component, signal } from '@angular/core';

@Component({
  imports: [
    MgnpCombobox,
    MgnpComboboxInput,
    MgnpComboboxButton,
    MgnpComboboxDropdown,
    MgnpComboboxOption,
    MgnpComboboxPortal,
    NgIcon,
  ],
  template: `
    <div mgnpCombobox [(mgnpComboboxValue)]="selectedOption">
      <input mgnpComboboxInput [value]="selectedOption()" />
      <button mgnpComboboxButton>
        <ng-icon name="heroChevronDown" />
      </button>
      <div *mgnpComboboxPortal mgnpComboboxDropdown>
        @for (option of options; track option) {
          <div mgnpComboboxOption [mgnpComboboxOptionValue]="option">
            {{ option }}
          </div>
        }
      </div>
    </div>
  `,
  providers: [provideIcons({ heroChevronDown })],
})
export default class ComboboxExample {
  readonly options = ['option 1', 'option 2', 'option 3'];
  readonly selectedOption = signal<string>('');
}
