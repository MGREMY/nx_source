import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [NgpButton, MgnpButton],
  template: `
    <p class="font-bold">Solid</p>
    <div class="flex flex-wrap gap-4 item-center">
      <button ngpButton mgnpButton>Default</button>
      <button ngpButton mgnpButton color="primary">Primary</button>
      <button ngpButton mgnpButton color="secondary">Secondary</button>
      <button ngpButton mgnpButton color="info">Info</button>
      <button ngpButton mgnpButton color="success">Success</button>
      <button ngpButton mgnpButton color="warning">Warning</button>
      <button ngpButton mgnpButton color="danger">Danger</button>
    </div>
    <p class="font-bold">Outline</p>
    <div class="flex flex-wrap gap-4 item-center">
      <button ngpButton mgnpButton variant="outline">Default</button>
      <button ngpButton mgnpButton variant="outline" color="primary">Primary</button>
      <button ngpButton mgnpButton variant="outline" color="secondary">Secondary</button>
      <button ngpButton mgnpButton variant="outline" color="info">Info</button>
      <button ngpButton mgnpButton variant="outline" color="success">Success</button>
      <button ngpButton mgnpButton variant="outline" color="warning">Warning</button>
      <button ngpButton mgnpButton variant="outline" color="danger">Danger</button>
    </div>
    <p class="font-bold">Disabled</p>
    <div class="flex flex-wrap gap-4 item-center">
      <button ngpButton disabled mgnpButton>Default</button>
      <button ngpButton disabled mgnpButton color="primary">Primary</button>
      <button ngpButton disabled mgnpButton color="secondary">Secondary</button>
      <button ngpButton disabled mgnpButton color="info">Info</button>
      <button ngpButton disabled mgnpButton color="success">Success</button>
      <button ngpButton disabled mgnpButton color="warning">Warning</button>
      <button ngpButton disabled mgnpButton color="danger">Danger</button>
    </div>
  `,
  host: {
    class: 'flex! flex-col flex-wrap gap-4 items-center',
  },
})
export default class ButtonExample {}
