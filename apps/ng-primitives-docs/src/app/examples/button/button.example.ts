import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [NgpButton, MgnpButton],
  template: `
    <button ngpButton mgnpButton>Default</button>
    <button ngpButton mgnpButton color="primary">Primary</button>
    <button ngpButton mgnpButton color="success">Success</button>
    <button ngpButton mgnpButton color="warning">Warning</button>
    <button ngpButton mgnpButton color="danger">Danger</button>
  `,
  host: {
    class: 'flex! flex-wrap gap-4 items-center',
  },
})
export default class ButtonExample {}
