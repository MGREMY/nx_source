import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[mgnpNavbarContent]',
  standalone: true,
  host: {
    'data-mgnp-component': 'mgnp-navbar-content',
    '[attr.data-enter]': 'isOpen() === true ? true : null',
    '[attr.data-exit]': 'isOpen() === false ? false : null',
  },
  exportAs: 'mgnpNavbarContent',
})
export class MgnpNavbarContent {
  protected readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  public toggle(newVal?: boolean | undefined): void {
    if (newVal === undefined) {
      const value = this._isOpen();
      newVal = !value;
    }

    this._isOpen.set(newVal);
  }
}
