import { MgnpInput } from '@mgremy/ng-primitives/input';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpInput],
  template: `<input mgnpInput placeholder="Enter your name" />`,
})
export default class Input {}
