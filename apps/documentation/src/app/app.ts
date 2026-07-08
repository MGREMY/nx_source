import { THEME_SERVICE } from '@mgremy/core';
import {
  MgnpNavbar,
  MgnpNavbarContent,
  MgnpNavbarItem,
} from '@mgremy/ng-primitives-extended/navbar';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3BottomLeft, heroBars4, heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import { octMarkGithub } from '@ng-icons/octicons';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { isActive, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
                [routerLink]="['/', 'documentation', 'core']"
                routerLinkActive="text-secondary">
                Documentation
              </a>
            </li>
          </ul>
        </div>

        <div class="flex flex-row flex-1 md:flex-none items-center justify-end gap-4">
          <a
            class="inline-flex items-center cursor-pointer"
            href="https://github.com/mgremy/nx_source"
            target="_blank">
            <ng-icon name="octMarkGithub" />
          </a>
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
          <button
            class="md:hidden! inline-flex items-center cursor-pointer"
            (click)="navbarContent.toggle()">
            <ng-icon name="heroBars4" />
          </button>
        </div>
      </nav>
    </header>

    <main class="mt-16 p-8 relative size-full">
      @if (_isSidebarDisplayed()) {
        <button
          class="absolute w-6 h-6 left-4 top-4 inline-flex xl:hidden items-center justify-center cursor-pointer"
          (click)="toggleSidebar()">
          <ng-icon name="heroBars3BottomLeft" />
        </button>
      }

      <router-outlet />
    </main>
  `,
  providers: [provideIcons({ heroBars4, heroSun, heroMoon, heroBars3BottomLeft, octMarkGithub })],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.isSidebarOpen.update((x) => !x);
  }
}
