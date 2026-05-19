import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgpDescription, NgpError, NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { NgpInput } from 'ng-primitives/input';

@Component({
  imports: [
    MgnpFormField,
    MgnpLabel,
    MgnpDescription,
    MgnpError,
    MgnpInput,
    NgpFormField,
    NgpLabel,
    NgpDescription,
    NgpError,
    NgpInput,
    ReactiveFormsModule,
  ],
  template: `
    <form class="grid grid-cols-1 md:grid-cols-2 gap-2" [formGroup]="formGroup">
      <div ngpFormField mgnpFormField>
        <label ngpLabel mgnpLabel for="email">Email</label>
        <p ngpDescription mgnpDescription>Enter your email in order to make this work</p>
        <input
          ngpInput
          mgnpInput
          name="email"
          placeholder="email@domain.com"
          [formControl]="formGroup.controls.email" />
        <p ngpError mgnpError ngpErrorValidator="required">This field is required.</p>
        <p ngpError mgnpError ngpErrorValidator="email">This field must be an email.</p>
      </div>
    </form>
  `,
})
export default class FormFieldExample {
  readonly formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
