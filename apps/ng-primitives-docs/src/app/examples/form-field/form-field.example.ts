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
    MgnpSwitch,
    MgnpSwitchThumb,
    MgnpButton,
    NgpComboboxPortal,
    NgIcon,
    ReactiveFormsModule,
    MgnpSwitch,
    MgnpSwitchThumb,
  ],
  template: `
    <form class="flex flex-col gap-4" [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      <div mgnpFormField>
        <span mgnpLabel>Name</span>
        <input mgnpInput [formControl]="formGroup.controls.name" />
        <p mgnpError validator="required">This field is required.</p>
      </div>
      <div mgnpFormField>
        <span mgnpLabel>Email</span>
        <input mgnpInput type="email" placeholder="email@domain.com" [formControl]="formGroup.controls.email" />
        <p mgnpError validator="required">This field is required.</p>
        <p mgnpError>This field must be an email.</p>
      </div>
      <div mgnpFormField>
        <span mgnpLabel>Birth date</span>
        <input mgnpInput type="date" [formControl]="formGroup.controls.birthDate" />
        <p mgnpError>This field is required.</p>
      </div>
      <div mgnpFormField>
        <span mgnpLabel>Phone number</span>
        <input mgnpInput [formControl]="formGroup.controls.phoneNumber" />
      </div>
      <div mgnpFormField>
        <span mgnpLabel>Account type</span>
        <p mgnpDescription>Please select one of the following options.</p>
        <div mgnpCombobox [formControl]="formGroup.controls.accountType">
          <button mgnpComboboxButton>
            {{ formGroup.controls.accountType.value || 'Select an option' }}
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
          <span mgnpLabel>I aggree that some data can be send to third party services.</span>
          <span mgnpCheckbox [formControl]="formGroup.controls.acceptTelemetry">
            @if (formGroup.controls.acceptTelemetry.value === true) {
              <ng-icon name="heroCheckMini" />
            }
          </span>
        </div>
        <p mgnpError validator="required">You must accept the conditions.</p>
      </div>
      <div mgnpFormField type="toggle">
        <div>
          <span mgnpLabel>Subscribe to the newsletter</span>
          <button mgnpSwitch [formControl]="formGroup.controls.acceptNewsletter">
            <span mgnpSwitchThumb></span>
          </button>
        </div>
      </div>

      <button mgnpButton type="submit" color="primary" variant="outline" [disabled]="formGroup.invalid">Submit</button>
    </form>
  `,
  providers: [provideIcons({ heroCheckMini, heroChevronDown })],
})
export default class FormFieldExample {
  readonly formGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
    phoneNumber: new FormControl<string>(''),
    accountType: new FormControl<string | null>(null, [Validators.required]),
    acceptTelemetry: new FormControl<boolean>(false, [Validators.requiredTrue]),
    acceptNewsletter: new FormControl<boolean>(true),
  });

  onSubmit(): void {
    const formValue = this.formGroup.value;

    console.log(formValue);
  }
}
