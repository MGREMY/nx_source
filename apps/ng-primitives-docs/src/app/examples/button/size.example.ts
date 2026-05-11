import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [NgpButton, MgnpButton],
  template: `
    <button ngpButton mgnpButton>Normal</button>
    <button ngpButton mgnpButton size="xs">Extra small</button>
    <button ngpButton mgnpButton size="sm">Small</button>
    <button ngpButton mgnpButton size="md">Medium</button>
    <button ngpButton mgnpButton size="lg">Large</button>
    <button ngpButton mgnpButton size="xl">Extra large</button>
  `,
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class SizeExample {}
