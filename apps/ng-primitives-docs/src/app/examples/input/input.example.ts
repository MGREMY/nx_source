import { MgnpInput } from '@mgremy/ng-primitives/input';

import { Component } from '@angular/core';
import { NgpInput } from 'ng-primitives/input';

@Component({
  imports: [NgpInput, MgnpInput],
  template: `<input ngpInput mgnpInput placeholder="Enter your name" />`,
})
export default class InputExample {}
