import { MgnpButton } from '@mgremy/ng-primitives/button';
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
    MgnpSwitch,
    MgnpSwitchThumb,
    MgnpButton,
    NgpComboboxPortal,
    NgIcon,
    FormField,
    FormRoot,
    MgnpSwitch,
    MgnpSwitchThumb,
  ],
  template: `
    <form class="flex flex-col gap-4" [formRoot]="form">
      <div mgnpFormField>
        <p mgnpLabel>Name</p>
        <input mgnpInput [formField]="form.name" />
        <p mgnpError validator="required">This field is required.</p>
      </div>
      <div mgnpFormField>
        <p mgnpLabel>Email</p>
        <input mgnpInput type="email" placeholder="email@domain.com" [formField]="form.email" />
        <p mgnpError validator="required">This field is required.</p>
        <p mgnpError>This field must be an email.</p>
      </div>
      <div mgnpFormField>
        <p mgnpLabel>Birth date</p>
        <input mgnpInput type="date" [formField]="form.birthDate" />
        <p mgnpError>This field is required.</p>
      </div>
      <div mgnpFormField>
        <p mgnpLabel>Phone number</p>
        <input mgnpInput [formField]="form.phoneNumber" />
      </div>
      <div mgnpFormField>
        <p mgnpLabel>Account type</p>
        <p mgnpDescription>Please select one of the following options.</p>
        <div mgnpCombobox [formField]="form.accountType">
          <button mgnpComboboxButton>
            {{ form.accountType().value() || 'Select an option' }}
            <ng-icon name="heroChevronDown" />
          </button>
          <div *ngpComboboxPortal mgnpComboboxDropdown>
            <option mgnpComboboxOption value="user">User</option>
            <option mgnpComboboxOption value="ai">AI</option>
          </div>
        </div>
        <p mgnpError validator="required">You must select one of the provided options.</p>
      </div>
      <div mgnpFormField type="toggle">
        <div>
          <p mgnpLabel>I aggree that some data can be send to third party services.</p>
          <span mgnpCheckbox [formField]="form.acceptTelemetry">
            @if (form.acceptTelemetry().value() === true) {
              <ng-icon name="heroCheckMini" />
            }
          </span>
        </div>
        <p mgnpError validator="required">You must accept the conditions.</p>
      </div>
      <div mgnpFormField type="toggle">
        <div>
          <p mgnpLabel>Subscribe to the newsletter</p>
          <button mgnpSwitch [formField]="form.acceptNewsletter">
            <span mgnpSwitchThumb></span>
          </button>
        </div>
      </div>

      <button mgnpButton type="submit" color="primary" variant="outline" [disabled]="form().invalid()">Submit</button>
    </form>
  `,
  providers: [provideIcons({ heroCheckMini, heroChevronDown })],
})
export default class SignalFormExample {
  readonly form = form(
    signal<{
      name: string;
      email: string;
      birthDate: Date | null;
      phoneNumber: string;
      accountType: string | null;
      acceptTelemetry: boolean;
      acceptNewsletter: boolean;
    }>({
      name: '',
      email: '',
      birthDate: null,
      phoneNumber: '',
      accountType: null,
      acceptTelemetry: false,
      acceptNewsletter: true,
    }),
    (root) => {
      required(root.name);

      required(root.email);
      email(root.email);

      required(root.birthDate);

      required(root.accountType);

      required(root.acceptTelemetry);
    },
    {
      submission: {
        action: async (field) => {
          console.log(field().value());

          return;
        },
      },
    }
  );
}
