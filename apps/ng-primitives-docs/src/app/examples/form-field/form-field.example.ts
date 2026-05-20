import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';
import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from '@ng-icons/heroicons/mini';

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [MgnpFormField, MgnpLabel, MgnpDescription, MgnpError, MgnpInput, MgnpCheckbox, NgIcon, ReactiveFormsModule],
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
        <label mgnpLabel for="email">Conditions</label>
        <span mgnpCheckbox [formControl]="formGroup.controls.checked">
          @if (formGroup.controls.checked.value === true) {
            <ng-icon name="heroCheckMini" />
          }
        </span>
        <p mgnpError validator="required">Please accept the conditions.</p>
      </div>
    </form>
  `,
  providers: [provideIcons({ heroCheckMini })],
})
export default class FormFieldExample {
  readonly formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    checked: new FormControl(false, [Validators.requiredTrue]),
  });
}
