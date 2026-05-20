import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';

import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { NgpInput } from 'ng-primitives/input';

@Component({
  imports: [MgnpFormField, MgnpLabel, MgnpDescription, MgnpError, MgnpInput, NgpInput, FormField],
  template: `
    <div mgnpFormField>
      <label mgnpLabel for="email">Email</label>
      <p mgnpDescription>Enter your email in order to make this work</p>
      <input ngpInput mgnpInput id="email" placeholder="email@domain.com" [formField]="form.email" />
      <p mgnpError validator="required">This field is required</p>
      <p mgnpError validator="email">This field must be an email</p>
    </div>
  `,
})
export default class SignalFormExample {
  private readonly formModel = signal({
    email: '',
  });

  readonly form = form(this.formModel, (root) => {
    required(root.email);
    email(root.email);
  });
}
