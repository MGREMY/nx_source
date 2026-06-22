import {
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxOption,
} from '@mgremy/ng-primitives/combobox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { Component, signal } from '@angular/core';
import { NgpComboboxPortal } from 'ng-primitives/combobox';

@Component({
  imports: [MgnpCombobox, MgnpComboboxDropdown, MgnpComboboxButton, MgnpComboboxOption, NgpComboboxPortal, NgIcon],
  template: `
    <div mgnpCombobox [(mgnpComboboxValue)]="selectedOption">
      <button mgnpComboboxButton>
        <span>{{ selectedOption() || 'Select an option' }}</span>
        <ng-icon name="heroChevronDown" />
      </button>
      <div *ngpComboboxPortal mgnpComboboxDropdown>
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
export default class WithoutInputExample {
  readonly options = ['option 1', 'option 2', 'option 3'];
  readonly selectedOption = signal<string>('');
}
