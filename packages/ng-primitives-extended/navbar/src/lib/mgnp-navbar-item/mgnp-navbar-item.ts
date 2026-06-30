import { MgnpNavbarContent } from '../mgnp-navbar-content/mgnp-navbar-content';

import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[mgnpNavbarItem]',
  providers: [],
  host: {
    'data-mgnp-navbar-item': '',
    class: 'mgnp-navbar-item mgnp-c-navbar-item',
    '(click)': 'onClick()',
  },
  hostDirectives: [],
  exportAs: 'mgnpNavbarItem',
})
export class MgnpNavbarItem {
  private readonly _mgnpNavbarContent = inject(MgnpNavbarContent);

  protected onClick(): void {
    this._mgnpNavbarContent.toggle(false);
  }
}
