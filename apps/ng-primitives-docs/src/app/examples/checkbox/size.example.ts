import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpCheckbox],
  template: `
    <span mgnpCheckbox></span>
    <span mgnpCheckbox size="xs"></span>
    <span mgnpCheckbox size="sm"></span>
    <span mgnpCheckbox size="md"></span>
    <span mgnpCheckbox size="lg"></span>
    <span mgnpCheckbox size="xl"></span>
  `,
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class SizeExample {}
