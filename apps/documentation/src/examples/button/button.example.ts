import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpButton],
  template: `
    <p class="font-bold">Solid</p>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      <button mgnpButton>Default</button>
      <button mgnpButton color="primary">Primary</button>
      <button mgnpButton color="accent">Accent</button>
      <button mgnpButton color="info">Info</button>
      <button mgnpButton color="success">Success</button>
      <button mgnpButton color="warning">Warning</button>
      <button mgnpButton color="danger">Danger</button>
    </div>
    <p class="font-bold">Outline</p>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      <button mgnpButton variant="outline">Default</button>
      <button mgnpButton variant="outline" color="primary">Primary</button>
      <button mgnpButton variant="outline" color="accent">Accent</button>
      <button mgnpButton variant="outline" color="info">Info</button>
      <button mgnpButton variant="outline" color="success">Success</button>
      <button mgnpButton variant="outline" color="warning">Warning</button>
      <button mgnpButton variant="outline" color="danger">Danger</button>
    </div>
    <p class="font-bold">Disabled</p>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      <button mgnpButton disabled>Default</button>
      <button mgnpButton disabled color="primary">Primary</button>
      <button mgnpButton disabled color="accent">Accent</button>
      <button mgnpButton disabled color="info">Info</button>
      <button mgnpButton disabled color="success">Success</button>
      <button mgnpButton disabled color="warning">Warning</button>
      <button mgnpButton disabled color="danger">Danger</button>
    </div>
  `,
  host: {
    class: 'flex! flex-col flex-wrap gap-4 items-center',
  },
})
export default class ButtonExample {}
