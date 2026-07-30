import {
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxOption,
  MgnpComboboxPortal,
} from '@mgremy/ng-primitives/combobox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { Component, signal } from '@angular/core';

@Component({
  imports: [MgnpCombobox, MgnpComboboxButton, MgnpComboboxDropdown, MgnpComboboxOption, MgnpComboboxPortal, NgIcon],
  template: `
    <div class="grid grid-rows-2 gap-y-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span class="place-self-center">{{ color }}</span>
        <div class="place-self-center" mgnpCombobox [(mgnpComboboxValue)]="selectedOption" [color]="color">
          <button mgnpComboboxButton>
            <span>{{ selectedOption() || 'Select an option' }}</span>
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
      }
    </div>
  `,
  providers: [provideIcons({ heroChevronDown })],
})
export default class Combobox {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];

  readonly options = ['option 1', 'option 2', 'option 3'];
  readonly selectedOption = signal<string>('');
}
