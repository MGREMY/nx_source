import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';
import {
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxOption,
} from '@mgremy/ng-primitives/combobox';
import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from '@ng-icons/heroicons/mini';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgpComboboxPortal } from 'ng-primitives/combobox';

@Component({
  imports: [
    MgnpFormField,
    MgnpLabel,
    MgnpDescription,
    MgnpError,
    MgnpInput,
    MgnpCheckbox,
    MgnpCombobox,
    MgnpComboboxDropdown,
    MgnpComboboxButton,
    MgnpComboboxOption,
    NgpComboboxPortal,
    NgIcon,
    ReactiveFormsModule,
  ],
  template: `
    <form class="grid grid-cols-1 md:grid-cols-2 gap-2" [formGroup]="formGroup">
      <div mgnpFormField>
        <label mgnpLabel for="email">Email</label>
        <p mgnpDescription>Enter your email in order to make this work</p>
        <input mgnpInput id="email" placeholder="email@domain.com" [formControl]="formGroup.controls.email" />
        <p mgnpError validator="required">This field is required.</p>
        <p mgnpError validator="email">This field must be an email.</p>
      </div>
      <div mgnpFormField>
        <label mgnpLabel for="checked">Conditions</label>
        <span mgnpCheckbox id="checked" [formControl]="formGroup.controls.checked">
          @if (formGroup.controls.checked.value === true) {
            <ng-icon name="heroCheckMini" />
          }
        </span>
        <p mgnpError validator="required">Please accept the conditions.</p>
      </div>
      <div mgnpFormField>
        <label mgnpLabel for="combobox">Option</label>
        <div mgnpCombobox id="combobox" [formControl]="formGroup.controls.combobox">
          <button mgnpComboboxButton>
            {{ formGroup.controls.combobox.value || 'Select an option' }}
            <ng-icon name="heroChevronDown" />
          </button>
          <div *ngpComboboxPortal mgnpComboboxDropdown>
            <option mgnpComboboxOption value="option1">Option 1</option>
            <option mgnpComboboxOption value="option2">Option 2</option>
            <option mgnpComboboxOption value="option3">Option 3</option>
          </div>
        </div>
        <p mgnpError validator="required">Please accept the conditions.</p>
      </div>
    </form>
  `,
  providers: [provideIcons({ heroCheckMini, heroChevronDown })],
})
export default class FormFieldExample {
  readonly formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    checked: new FormControl(false, [Validators.requiredTrue]),
    combobox: new FormControl('', [Validators.required]),
  });
}
