import { THEME_SERVICE } from '@mgremy/core';
import {
  MgnpNavbar,
  MgnpNavbarContent,
  MgnpNavbarItem,
} from '@mgremy/ng-primitives-extended/navbar';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3BottomLeft, heroBars4, heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  isActive,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MgnpNavbar,
    MgnpNavbarContent,
    MgnpNavbarItem,
    NgIcon,
    RouterLinkActive,
  ],
  template: `
    <header class="fixed top-0 w-full z-100">
      <nav
        mgnpNavbar
        class="border-b-2 border-b-primary">
        <a
          class="cursor-pointer"
          [routerLink]="['/']">
          <span class="sr-only">Brand</span>
          <span class="text-xl md:text-2xl font-semibold whitespace-nowrap">Documentation</span>
        </a>

        <div
          mgnpNavbarContent
          #navbarContent="mgnpNavbarContent">
          <ul>
            <li>
              <a
                mgnpNavbarItem
                [routerLink]="['/', 'documentation']"
                routerLinkActive
                [routerLinkActiveOptions]="{ exact: true }">
                Documentation
              </a>
            </li>
          </ul>
        </div>

        <div class="flex flex-row flex-1 md:flex-none items-center justify-end gap-4">
          <button class="md:hidden! inline-flex items-center cursor-pointer">
            <ng-icon
              name="heroBars4"
              (click)="navbarContent.toggle()" />
          </button>
          <button
            class="inline-flex items-center cursor-pointer"
            (click)="toggleTheme()">
            <ng-icon
              name="heroSun"
              class="dark:hidden! inline-block!" />
            <ng-icon
              name="heroMoon"
              class="hidden! dark:inline-block!" />
          </button>
        </div>
      </nav>
    </header>

    <main class="overflow-scroll mt-16 p-12 md:p-8 relative">
      @if (_isSidebarDisplayed()) {
        <button
          class="absolute w-6 h-6 left-4 top-4 inline-flex md:hidden items-center justify-center cursor-pointer"
          (click)="toggleSidebar()">
          <ng-icon name="heroBars3BottomLeft" />
        </button>
      }

      <router-outlet />
    </main>
  `,
  providers: [provideIcons({ heroBars4, heroSun, heroMoon, heroBars3BottomLeft })],
})
export class AppComponent {
  private readonly _themeService = inject(THEME_SERVICE);
  private readonly _router = inject(Router);

  protected readonly _isSidebarDisplayed = isActive('/documentation', this._router);
  readonly isSidebarOpen = signal(false);

  toggleTheme(): void {
    const currentTheme = this._themeService.getTheme();

    if (currentTheme === 'light') this._themeService.setTheme('dark');
    else if (currentTheme === 'dark') this._themeService.setTheme('light');
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((isOpen) => !isOpen);
  }
}
