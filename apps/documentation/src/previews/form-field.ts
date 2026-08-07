import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';
import {
  MgnpCombobox,
  MgnpComboboxButton,
  MgnpComboboxDropdown,
  MgnpComboboxOption,
  MgnpComboboxPortal,
} from '@mgremy/ng-primitives/combobox';
import {
  MgnpDatePicker,
  MgnpDatePickerCell,
  MgnpDatePickerCellRender,
  MgnpDatePickerDateButton,
  MgnpDatePickerGrid,
  MgnpDatePickerHeader,
  MgnpDatePickerLabel,
  MgnpDatePickerNextMonth,
  MgnpDatePickerPreviousMonth,
  MgnpDatePickerRowRender,
} from '@mgremy/ng-primitives/date-picker';
import {
  MgnpDescription,
  MgnpError,
  MgnpFormControl,
  MgnpFormField,
  MgnpInputGroup,
  MgnpInputGroupAddon,
  MgnpLabel,
} from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';
import {
  MgnpNumberField,
  MgnpNumberFieldDecrement,
  MgnpNumberFieldIncrement,
  MgnpNumberFieldInput,
} from '@mgremy/ng-primitives/number-field';
import { MgnpPassword, MgnpPasswordInput, MgnpPasswordToggle } from '@mgremy/ng-primitives/password';
import { MgnpPopover, MgnpPopoverTrigger } from '@mgremy/ng-primitives/popover';
import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAtSymbolMini,
  heroCheckMini,
  heroChevronLeftMini,
  heroChevronRightMini,
  heroEyeMini,
  heroEyeSlashMini,
  heroPhoneMini,
} from '@ng-icons/heroicons/mini';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    MgnpComboboxPortal,
    MgnpSwitch,
    MgnpSwitchThumb,
    MgnpButton,
    MgnpPassword,
    MgnpPasswordInput,
    MgnpPasswordToggle,
    MgnpNumberField,
    MgnpNumberFieldInput,
    MgnpNumberFieldIncrement,
    MgnpNumberFieldDecrement,
    NgIcon,
    ReactiveFormsModule,
    MgnpSwitch,
    MgnpSwitchThumb,
    MgnpDatePicker,
    MgnpDatePickerPreviousMonth,
    MgnpDatePickerNextMonth,
    MgnpDatePickerLabel,
    MgnpDatePickerGrid,
    MgnpDatePickerHeader,
    MgnpDatePickerRowRender,
    MgnpDatePickerCell,
    MgnpDatePickerCellRender,
    MgnpDatePickerDateButton,
    DatePipe,
    MgnpPopover,
    MgnpPopoverTrigger,
    MgnpFormControl,
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
        <p mgnpLabel>Password</p>
        <div mgnpPassword #password="mgnpPassword">
          <input mgnpInput mgnpPasswordInput type="password" [formControl]="formGroup.controls.password" />
          <button mgnpButton mgnpPasswordToggle>
            <ng-icon [name]="password.state().visible() ? 'heroEyeSlashMini' : 'heroEyeMini'" />
          </button>
        </div>
        <p mgnpError mgnpErrorValidator="required">This field is required.</p>
      </div>
      <div mgnpFormField>
        <div mgnpInputGroup>
          <div mgnpInputGroupAddon><p mgnpLabel>Birth date</p></div>
          <input
            [mgnpPopoverTrigger]="datePickerPopover"
            [mgnpPopoverTriggerContext]="{ control: formGroup.controls.birthDate }"
            [formControl]="formGroup.controls.birthDate"
            [value]="formGroup.controls.birthDate.value | date: 'longDate'"
            placeholder="Select a date"
            mgnpFormControl
            readonly />
        </div>
        <p mgnpError mgnpErrorValidator="required">This field is required.</p>
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
        <p mgnpLabel>What is the meaning of life ?</p>
        <div mgnpNumberField mgnpNumberFieldMin="0" [formControl]="formGroup.controls.lifeMeaning">
          <button mgnpNumberFieldDecrement>-</button>
          <input mgnpNumberFieldInput />
          <button mgnpNumberFieldIncrement>+</button>
        </div>
        <p mgnpError mgnpErrorValidator="required">You must say what is, for you, the meaning of life.</p>
        <p mgnpError mgnpErrorValidator="min">The meaning of life must be at least 0.</p>
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
            <div *mgnpComboboxPortal mgnpComboboxDropdown>
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

    <ng-template #datePickerPopover let-ctx>
      <div mgnpPopover>
        <div mgnpDatePicker #datePicker="mgnpDatePicker" [formControl]="ctx().control">
          <div mgnpDatePickerHeader>
            <button mgnpDatePickerPreviousMonth aria-label="previous month">
              <ng-icon name="heroChevronLeftMini" />
            </button>
            <h2 mgnpDatePickerLabel>{{ datePicker.state().focusedDate() | date: 'longDate' }}</h2>
            <button mgnpDatePickerNextMonth aria-label="next-month">
              <ng-icon name="heroChevronRightMini" />
            </button>
          </div>
          <table mgnpDatePickerGrid>
            <thead>
              <tr>
                <th scope="col" abbr="Sunday">S</th>
                <th scope="col" abbr="Monday">M</th>
                <th scope="col" abbr="Tuesday">T</th>
                <th scope="col" abbr="Wednesday">W</th>
                <th scope="col" abbr="Thursday">T</th>
                <th scope="col" abbr="Friday">F</th>
                <th scope="col" abbr="Saturday">S</th>
              </tr>
            </thead>
            <tbody>
              <tr *mgnpDatePickerRowRender>
                <td *mgnpDatePickerCellRender="let date" mgnpDatePickerCell>
                  <button mgnpDatePickerDateButton>{{ date.getDate() }}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ng-template>
  `,
  providers: [
    provideIcons({
      heroCheckMini,
      heroChevronDown,
      heroAtSymbolMini,
      heroPhoneMini,
      heroEyeMini,
      heroEyeSlashMini,
      heroChevronLeftMini,
      heroChevronRightMini,
    }),
  ],
})
export default class FormField {
  private readonly initialFormValue = {
    name: '',
    email: '',
    password: '',
    birthDate: null,
    phoneNumber: '',
    lifeMeaning: 42,
    accountType: null,
    acceptTelemetry: false,
    acceptNewsletter: true,
  };

  readonly formGroup = new FormGroup({
    name: new FormControl<string>(this.initialFormValue.name, [Validators.required]),
    email: new FormControl<string>(this.initialFormValue.email, [Validators.required, Validators.email]),
    password: new FormControl<string>(this.initialFormValue.password, [Validators.required]),
    birthDate: new FormControl<Date | null>(this.initialFormValue.birthDate, [Validators.required]),
    phoneNumber: new FormControl<string>(this.initialFormValue.phoneNumber, [
      Validators.pattern(/^[0-9]{0,1}[1-9]{1}([. -]?[0-9][0-9]){4}$/),
    ]),
    lifeMeaning: new FormControl<number>(this.initialFormValue.lifeMeaning, [Validators.required, Validators.min(0)]),
    accountType: new FormControl<string | null>(this.initialFormValue.accountType, [Validators.required]),
    acceptTelemetry: new FormControl<boolean>(this.initialFormValue.acceptTelemetry, [Validators.requiredTrue]),
    acceptNewsletter: new FormControl<boolean>(this.initialFormValue.acceptNewsletter),
  });

  onSubmit(): void {
    console.log(this.formGroup.value);

    this.formGroup.reset(this.initialFormValue);
    this.formGroup.markAsPristine();
  }

  log(obj: any): void {
    console.log(obj);
  }
}
