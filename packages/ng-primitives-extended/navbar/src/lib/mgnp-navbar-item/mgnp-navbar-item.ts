import { MgnpNavbarContent } from '../mgnp-navbar-content/mgnp-navbar-content';
import { MgnpNavbar } from '../mgnp-navbar/mgnp-navbar';

import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[mgnpNavbarItem]',
  providers: [],
  host: {
    'data-mgnp-navbar-item': '',
    class: 'mgnp-navbar-item mgnp-c-navbar-item',
    '[attr.data-mgnp-navbar-item-color]': 'navbar.color()',
    '(click)': 'onClick()',
  },
  hostDirectives: [],
  exportAs: 'mgnpNavbarItem',
})
export class MgnpNavbarItem {
  protected readonly navbar = inject(MgnpNavbar);
  protected readonly navbarContent = inject(MgnpNavbarContent);

  protected onClick(): void {
    this.navbarContent.toggle(false);
  }
}
