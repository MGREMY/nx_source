import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'mgnp-navbar-content',
  imports: [],
  standalone: true,
  templateUrl: './mgnp-navbar-content.component.html',
  styleUrl: './mgnp-navbar-content.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-enter]': 'isOpen() === true ? true : null',
    '[attr.data-exit]': 'isOpen() === false ? false : null',
  },
  hostDirectives: [],
})
export class MgnpNavbarContent {
  protected readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  toggle(newVal?: boolean | undefined): void {
    if (newVal === undefined) {
      const value = this._isOpen();
      newVal = !value;
    }

    this._isOpen.set(newVal);
  }
}
