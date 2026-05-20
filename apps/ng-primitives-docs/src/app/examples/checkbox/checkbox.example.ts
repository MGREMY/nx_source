import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini, heroMinusMini } from '@ng-icons/heroicons/mini';

import { Component, signal } from '@angular/core';

@Component({
  imports: [MgnpCheckbox, NgIcon],
  template: `
    <span mgnpCheckbox [indeterminate]="checked() === undefined" [(checked)]="checked">
      @if (checked() === undefined) {
        <ng-icon name="heroMinusMini" />
      } @else if (checked()) {
        <ng-icon name="heroCheckMini" />
      }
    </span>
  `,
  providers: [
    provideIcons({
      heroCheckMini,
      heroMinusMini,
    }),
  ],
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class CheckboxExample {
  readonly checked = signal(undefined);
}
