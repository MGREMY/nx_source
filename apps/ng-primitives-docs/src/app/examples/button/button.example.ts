import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component, signal } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [NgpButton, MgnpButton],
  template: `
    <button
      ngpButton
      mgnpButton
      (click)="count.set(count() + 1)">
      {{ count() ? 'Count ' + count() : 'Click me' }}
    </button>
  `,
})
export default class ButtonExample {
  readonly count = signal(0);
}
