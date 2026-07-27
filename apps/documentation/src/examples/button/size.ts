import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton],
  template: `
    @for (size of _sizes; track $index) {
      <button mgnpButton [size]="size">{{ size }}</button>
    }
  `,
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class SizeExample {
  readonly _sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
}
