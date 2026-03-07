import { MgnpNavbarContent } from '../mgnp-navbar-content/mgnp-navbar-content.directive';

import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[mgnpNavbarItem]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-navbar-item',
    '(click)': 'onClick()',
  },
})
export class MgnpNavbarItem {
  private readonly _mgnpNavbarContent = inject(MgnpNavbarContent);

  protected onClick(): void {
    this._mgnpNavbarContent.toggle(false);
  }
}
