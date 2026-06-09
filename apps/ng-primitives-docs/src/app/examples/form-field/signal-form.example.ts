import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';
import {
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxOption,
} from '@mgremy/ng-primitives/combobox';
import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';
import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from '@ng-icons/heroicons/mini';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
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
    FormField,
    FormRoot,
    MgnpSwitch,
    MgnpSwitchThumb,
  ],
  template: `
    <form class="grid grid-cols-1 md:grid-cols-2 gap-2" [formRoot]="form">
      <div mgnpFormField>
        <label mgnpLabel for="email">Email</label>
        <p mgnpDescription>Enter your email in order to make this work</p>
        <input mgnpInput id="email" placeholder="email@domain.com" [formField]="form.email" />
        <p mgnpError validator="required">This field is required</p>
        <p mgnpError validator="email">This field must be an email</p>
      </div>
      <div mgnpFormField>
        <label mgnpLabel for="email">Conditions</label>
        <span mgnpCheckbox [formField]="form.checked">
          @if (form.checked().value() === true) {
            <ng-icon name="heroCheckMini" />
          }
        </span>
        <p mgnpError validator="required">Please accept the conditions.</p>
      </div>
      <div mgnpFormField>
        <label mgnpLabel for="combobox">Option</label>
        <div mgnpCombobox id="combobox" [formField]="form.combobox">
          <button mgnpComboboxButton>
            {{ form.combobox().value() || 'Select an option' }}
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
      <div mgnpFormField>
        <label mgnpLabel for="enableFeature">Feature</label>
        <p mgnpDescription>Do you want to enable the feature ?</p>
        <button mgnpSwitch id="enableFeature" [formField]="form.enableFeature">
          <span mgnpSwitchThumb></span>
        </button>
      </div>
    </form>
  `,
  providers: [provideIcons({ heroCheckMini, heroChevronDown })],
})
export default class SignalFormExample {
  readonly form = form(
    signal({
      email: '',
      checked: false,
      combobox: '',
      enableFeature: false,
    }),
    (schema) => {
      required(schema.email);
      email(schema.email);

      required(schema.checked);

      required(schema.combobox);
    }
  );
}
