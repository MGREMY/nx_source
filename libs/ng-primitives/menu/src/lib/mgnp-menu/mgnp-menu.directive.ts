import { Directive, inject } from '@angular/core';
import { NgpMenu } from 'ng-primitives/menu';

const options = ['ngpMenu'];

const error = new Error(`MgnpMenu must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpMenu][mgnpMenu]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-menu',
  },
})
export class MgnpMenu {
  protected readonly ngpMenu = inject(NgpMenu, { optional: true });

  constructor() {
    if (!this.ngpMenu) {
      console.error(this);
      throw error;
    }
  }
}
