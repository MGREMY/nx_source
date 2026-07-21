import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpSwitch, MgnpSwitchThumb],
  template: `
    <button mgnpSwitch>
      <span mgnpSwitchThumb></span>
    </button>
  `,
})
export default class Switch {}
