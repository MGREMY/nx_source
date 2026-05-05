import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from '@ng-icons/heroicons/mini';

import { Component, signal } from '@angular/core';
import { NgpCheckbox } from 'ng-primitives/checkbox';

@Component({
  imports: [NgpCheckbox, MgnpCheckbox, NgIcon],
  template: `
    <span ngpCheckbox mgnpCheckbox [(ngpCheckboxChecked)]="basic">
      @if (basic()) {
        <ng-icon name="heroCheckMini" />
      }
    </span>
  `,
  providers: [
    provideIcons({
      heroCheckMini,
    }),
  ],
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class CheckboxExample {
  readonly basic = signal(true);
}
