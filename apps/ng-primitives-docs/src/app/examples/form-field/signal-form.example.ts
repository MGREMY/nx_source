import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';
import { MgnpDescription, MgnpError, MgnpFormField, MgnpLabel } from '@mgremy/ng-primitives/form-field';
import { MgnpInput } from '@mgremy/ng-primitives/input';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from '@ng-icons/heroicons/mini';

import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';

@Component({
  imports: [MgnpFormField, MgnpLabel, MgnpDescription, MgnpError, MgnpInput, MgnpCheckbox, NgIcon, FormField, FormRoot],
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
    </form>
  `,
  providers: [provideIcons({ heroCheckMini })],
})
export default class SignalFormExample {
  private readonly formModel = signal({
    email: '',
    checked: false,
  });

  readonly form = form(this.formModel, (root) => {
    required(root.email);
    email(root.email);
    required(root.checked);
  });
}
