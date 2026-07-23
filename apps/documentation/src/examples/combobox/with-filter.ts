import {
  comboboxFilter,
  comboboxValue,
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxInput,
  MgnpComboboxOption,
  MgnpComboboxPortal,
} from '@mgremy/ng-primitives/combobox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { Component } from '@angular/core';

@Component({
  imports: [
    MgnpCombobox,
    MgnpComboboxDropdown,
    MgnpComboboxButton,
    MgnpComboboxInput,
    MgnpComboboxOption,
    MgnpComboboxPortal,
    NgIcon,
  ],
  template: `
    <div
      mgnpCombobox
      [(mgnpComboboxValue)]="comboboxValue.value"
      (mgnpComboboxValueChange)="comboboxFilter.onValueChange($event)"
      (mgnpComboboxOpenChange)="comboboxFilter.onOpenChange($event)">
      <input mgnpComboboxInput [value]="comboboxValue.input()" (input)="comboboxFilter.onFilterChange($event)" />
      <button mgnpComboboxButton>
        <ng-icon name="heroChevronDown" />
      </button>
      <div *mgnpComboboxPortal mgnpComboboxDropdown>
        @for (option of comboboxFilter.filteredOptions(); track option) {
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
  readonly comboboxValue = comboboxValue<string>();

  readonly comboboxFilter = comboboxFilter({
    options: this.options,
    inputValue: this.comboboxValue.input,
    value: this.comboboxValue.value,
    filterMapper: (o, v) => o.toLowerCase().includes(v.toLowerCase()),
  });
}
