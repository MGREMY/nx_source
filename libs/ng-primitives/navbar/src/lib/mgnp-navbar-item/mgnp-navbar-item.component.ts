import { MgnpNavbarContent } from '../mgnp-navbar-content/mgnp-navbar-content.component';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'mgnp-navbar-item, button[mgnpNavbarItem], a[mgnpNavbarItem]',
  imports: [],
  standalone: true,
  templateUrl: './mgnp-navbar-item.component.html',
  styleUrl: './mgnp-navbar-item.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onClick()',
  },
  hostDirectives: [],
})
export class MgnpNavbarItem {
  private readonly _mgnpNavbarContent = inject(MgnpNavbarContent);

  protected onClick(): void {
    this._mgnpNavbarContent.toggle(false);
  }
}
