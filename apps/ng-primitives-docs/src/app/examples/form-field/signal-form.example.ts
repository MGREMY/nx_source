import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';

import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
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
    FormField,
  ],
  template: `
    <div ngpFormField mgnpFormField>
      <label ngpLabel mgnpLabel for="email">Email</label>
      <p ngpDescription mgnpDescription>Enter your email in order to make this work</p>
      <input ngpInput mgnpInput placeholder="email@domain.com" [formField]="form.email" />
      <p ngpError mgnpError ngpErrorValidator="required">This field is required</p>
      <p ngpError mgnpError ngpErrorValidator="email">This field must be an email</p>
    </div>
  `,
})
export default class FormFieldExample {
  private readonly formModel = signal({
    email: '',
  });

  readonly form = form(this.formModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);
  });
}
