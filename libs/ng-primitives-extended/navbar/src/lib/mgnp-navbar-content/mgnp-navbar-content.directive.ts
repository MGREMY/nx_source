import { MgnpNavbar } from '../mgnp-navbar/mgnp-navbar.directive';

import { Directive, inject, signal } from '@angular/core';

@Directive({
  selector: '[mgnpNavbarContent], div[mgnpNavbarContent]',
  standalone: true,
  providers: [],
  host: {
    'data-mgnp-component': 'mgnp-navbar-content',
    '[attr.data-enter]': 'isOpen() === true ? true : null',
    '[attr.data-exit]': 'isOpen() === false ? true : null',
    '[attr.data-is-always-open]': 'this._mgnpNavbar.isAlwaysOpen() === true ? true : null',
  },
  hostDirectives: [],
  exportAs: 'mgnpNavbarContent',
})
export class MgnpNavbarContent {
  protected readonly _mgnpNavbar = inject(MgnpNavbar);

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
