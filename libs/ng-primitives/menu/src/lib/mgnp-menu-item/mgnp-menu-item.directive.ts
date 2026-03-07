import { Directive, inject } from '@angular/core';
import { NgpMenuItem } from 'ng-primitives/menu';

const options = ['ngpMenuItem'];

const error = new Error(`MgnpMenuItem must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpMenuItem][mgnpMenuItem]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-menu-item',
  },
})
export class MgnpMenuItem {
  protected readonly ngpMenuItem = inject(NgpMenuItem, { optional: true });

  constructor() {
    if (!this.ngpMenuItem) {
      console.error(this);
      throw error;
    }
  }
}
