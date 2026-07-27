import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpInput } from '@mgremy/ng-primitives/input';
import { MgnpPassword, MgnpPasswordInput, MgnpPasswordToggle } from '@mgremy/ng-primitives/password';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEyeMini, heroEyeSlashMini } from '@ng-icons/heroicons/mini';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpPassword, MgnpPasswordInput, MgnpPasswordToggle, MgnpInput, MgnpButton, NgIcon],
  template: `
    <div mgnpPassword #password="mgnpPassword">
      <input
        mgnpInput
        mgnpPasswordInput
        placeholder="Enter your password"
        type="password"
        autocomplete="current-password" />
      <button mgnpButton mgnpPasswordToggle>
        <ng-icon [name]="password.state().visible() ? 'heroEyeSlashMini' : 'heroEyeMini'" />
      </button>
    </div>
  `,
  providers: [provideIcons({ heroEyeMini, heroEyeSlashMini })],
})
export default class Password {}
