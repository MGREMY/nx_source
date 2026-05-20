import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgpInput } from 'ng-primitives/input';

@Component({
  imports: [MgnpFormField, MgnpLabel, MgnpDescription, MgnpError, MgnpInput, NgpInput, ReactiveFormsModule],
  template: `
    <form class="grid grid-cols-1 md:grid-cols-2 gap-2" [formGroup]="formGroup">
      <div mgnpFormField>
        <label mgnpLabel for="email">Email</label>
        <p mgnpDescription>Enter your email in order to make this work</p>
        <input ngpInput mgnpInput id="email" placeholder="email@domain.com" [formControl]="formGroup.controls.email" />
        <p mgnpError validator="required">This field is required.</p>
        <p mgnpError validator="email">This field must be an email.</p>
      </div>
    </form>
  `,
})
export default class FormFieldExample {
  readonly formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
