import { MgnpNavbar } from '../mgnp-navbar/mgnp-navbar';

import { Directive, inject, signal } from '@angular/core';

@Directive({
  selector: '[mgnpNavbarContent], div[mgnpNavbarContent]',
  providers: [],
  host: {
    'data-mgnp-navbar-content': '',
    class: 'mgnp-navbar-content mgnp-c-navbar-content',
    '[attr.data-mgnp-navbar-content-color]': 'navbar.color()',
    '[attr.data-mgnp-navbar-content-enter]': 'isOpen() === true ? true : null',
    '[attr.data-mgnp-navbar-content-exit]': 'isOpen() === false ? true : null',
    '[attr.data-mgnp-navbar-content-is-always-open]':
      'navbar.isAlwaysOpen() === true ? true : null',
  },
  hostDirectives: [],
  exportAs: 'mgnpNavbarContent',
})
export class MgnpNavbarContent {
  protected readonly navbar = inject(MgnpNavbar);

  private readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  toggle(newVal?: boolean | undefined): void {
    if (newVal === undefined) {
      const value = this._isOpen();
      newVal = !value;
    }

    this._isOpen.set(newVal);
  }
}
