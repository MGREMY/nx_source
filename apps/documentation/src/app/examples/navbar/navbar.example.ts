import { THEME_SERVICE } from '@mgremy/core';
import { MgnpNavbar, MgnpNavbarContent, MgnpNavbarItem } from '@mgremy/ng-primitives-extended/navbar';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars4, heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [MgnpNavbar, MgnpNavbarContent, MgnpNavbarItem, NgIcon, RouterLink, RouterLinkActive],
  template: `
    <section class="w-full">
      <nav mgnpNavbar>
        <button class="inline-flex items-center cursor-pointer">
          <ng-icon name="heroBars4" class="md:hidden!" (click)="navbarContent.toggle()" />
        </button>
        <button
          class="inline-flex items-center cursor-pointer"
          (click)="_themeService.setTheme(_themeService.getTheme() === 'light' ? 'dark' : 'light')">
          <ng-icon name="heroSun" class="dark:hidden! inline-block!" />
          <ng-icon name="heroMoon" class="hidden! dark:inline-block!" />
        </button>
        <a class="cursor-pointer" [routerLink]="['/']">
          <span class="sr-only">Brand</span>
          <span class="text-xl md:text-2xl font-semibold whitespace-nowrap">my site</span>
        </a>
        <div mgnpNavbarContent #navbarContent="mgnpNavbarContent">
          <ul>
            <li>
              <a
                mgnpNavbarItem
                [routerLink]="['/', 'documentation', 'ng-primitives', 'extended', 'navbar']"
                routerLinkActive
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page">
                Navbar
              </a>
            </li>
            <li>
              <a
                mgnpNavbarItem
                [routerLink]="['/']"
                routerLinkActive
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page">
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  `,
  providers: [provideIcons({ heroBars4, heroSun, heroMoon })],
})
export default class NavbarExample {
  protected readonly _themeService = inject(THEME_SERVICE);
}
