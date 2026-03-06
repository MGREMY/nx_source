import { NxWelcome } from './nx-welcome';

import { Component } from '@angular/core';

@Component({
  imports: [NxWelcome],
  standalone: true,
  template: `<app-nx-welcome />`,
})
export default class HomePageComponent {}
