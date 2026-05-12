import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';

import { Component } from '@angular/core';
import { NgpSwitch, NgpSwitchThumb } from 'ng-primitives/switch';

@Component({
  imports: [MgnpSwitch, MgnpSwitchThumb, NgpSwitch, NgpSwitchThumb],
  template: `
    <button ngpSwitch mgnpSwitch>
      <span ngpSwitchThumb mgnpSwitchThumb></span>
    </button>
  `,
})
export default class SwitchExample {}
