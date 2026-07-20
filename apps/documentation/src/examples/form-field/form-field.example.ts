import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';
import {
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxOption,
} from '@mgremy/ng-primitives/combobox';
import {
  MgnpDescription,
  MgnpError,
  MgnpFormField,
  MgnpInputGroup,
  MgnpInputGroupAddon,
  MgnpLabel,
} from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';
import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAtSymbolMini, heroCheckMini, heroPhoneMini } from '@ng-icons/heroicons/mini';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgpComboboxPortal } from 'ng-primitives/combobox';

@Component({
  imports: [
    MgnpFormField,
    MgnpLabel,
    MgnpInputGroup,
    MgnpInputGroupAddon,
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
        <p mgnpLabel>User name</p>
        <div mgnpInputGroup>
          <div mgnpInputGroupAddon><p mgnpLabel>Name</p></div>
          <input mgnpInput [formControl]="formGroup.controls.name" />
        </div>
        <p mgnpError mgnpErrorValidator="required">This field is required.</p>
      </div>
      <div mgnpFormField>
        <div mgnpInputGroup>
          <div mgnpInputGroupAddon><p mgnpLabel>Email</p></div>
          <input mgnpInput type="email" placeholder="email@domain.com" [formControl]="formGroup.controls.email" />
          <span mgnpInputGroupAddon><ng-icon name="heroAtSymbolMini" /></span>
        </div>
        <p mgnpError mgnpErrorValidator="required">This field is required.</p>
        <p mgnpError>This field must be an email.</p>
      </div>
      <div mgnpFormField>
        <div mgnpInputGroup>
          <div mgnpInputGroupAddon><p mgnpLabel>Birth date</p></div>
          <input mgnpInput type="date" [formControl]="formGroup.controls.birthDate" />
        </div>
        <p mgnpError>This field is required.</p>
      </div>
      <div mgnpFormField>
        <div mgnpInputGroup>
          <div mgnpInputGroupAddon><p mgnpLabel>+33</p></div>
          <input mgnpInput placeholder="6.12.34.56.78" [formControl]="formGroup.controls.phoneNumber" />
          <div mgnpInputGroupAddon><ng-icon name="heroPhoneMini" /></div>
        </div>
        <p mgnpError mgnpErrorValidator="pattern">The phone number must have the french phone number form.</p>
      </div>
      <div mgnpFormField>
        <p mgnpDescription>Choose the corresponding item depending on the account type.</p>
        <div mgnpInputGroup>
          <div mgnpInputGroupAddon><p mgnpLabel>Account type</p></div>
          <div mgnpCombobox [formControl]="formGroup.controls.accountType">
            <button mgnpComboboxButton>
              {{ formGroup.controls.accountType.value || 'Select an option' }}
              <ng-icon name="heroChevronDown" />
            </button>
            <div *ngpComboboxPortal mgnpComboboxDropdown>
              <option mgnpComboboxOption mgnpComboboxOptionValue="user">user</option>
              <option mgnpComboboxOption mgnpComboboxOptionValue="ai agent">ai agent</option>
            </div>
          </div>
        </div>
        <p mgnpError mgnpErrorValidator="required">You must select one of the provided options.</p>
      </div>
      <div mgnpFormField type="toggle">
        <div class="flex items-center justify-between gap-2">
          <span mgnpLabel>I agree that some data can be sent to third-party services.</span>
          <span mgnpCheckbox [formControl]="formGroup.controls.acceptTelemetry">
            @if (formGroup.controls.acceptTelemetry.value === true) {
              <ng-icon name="heroCheckMini" />
            }
          </span>
        </div>
        <p mgnpError mgnpErrorValidator="required">You must accept the conditions.</p>
      </div>
      <div mgnpFormField type="toggle">
        <div class="flex items-center justify-between gap-2">
          <span mgnpLabel>Subscribe to the newsletter</span>
          <button mgnpSwitch [formControl]="formGroup.controls.acceptNewsletter">
            <span mgnpSwitchThumb></span>
          </button>
        </div>
      </div>

      <button mgnpButton type="submit" color="primary" variant="outline" [disabled]="formGroup.invalid">Submit</button>
    </form>
  `,
  providers: [provideIcons({ heroCheckMini, heroChevronDown, heroAtSymbolMini, heroPhoneMini })],
})
export default class FormFieldExample {
  private readonly initialFormValue = {
    name: '',
    email: '',
    birthDate: null,
    phoneNumber: '',
    accountType: null,
    acceptTelemetry: false,
    acceptNewsletter: true,
  };

  readonly formGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.pattern('^[0-9]{0,1}[1-9]{1}([. -]?[0-9][0-9]){4}$')]),
    accountType: new FormControl<string | null>(null, [Validators.required]),
    acceptTelemetry: new FormControl<boolean>(false, [Validators.requiredTrue]),
    acceptNewsletter: new FormControl<boolean>(true),
  });

  onSubmit(): void {
    const formValue = this.formGroup.value;
    console.log(formValue);

    this.formGroup.reset(this.initialFormValue);
  }
}
