import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton],
  template: `
    <button mgnpButton>Normal</button>
    <button mgnpButton size="xs">Extra small</button>
    <button mgnpButton size="sm">Small</button>
    <button mgnpButton size="md">Medium</button>
    <button mgnpButton size="lg">Large</button>
    <button mgnpButton size="xl">Extra large</button>
  `,
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class SizeExample {}
