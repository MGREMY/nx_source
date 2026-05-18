import { APP_THEME_SERVICE } from '@mgremy/core';
import {
  MgnpNavbar,
  MgnpNavbarContent,
  MgnpNavbarItem,
} from '@mgremy/ng-primitives-extended/navbar';
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoon, heroQuestionMarkCircle, heroSun } from '@ng-icons/heroicons/outline';

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [
    MgnpNavbar,
    MgnpNavbarContent,
    MgnpNavbarItem,
    MgnpButton,
    NgpButton,
    NgIcon,
    RouterLink,
  ],
  standalone: true,
  template: `
    <header class="fixed top-0 w-full z-100">
      <nav
        mgnpNavbar
        isAlwaysOpen>
        <button
          class="inline-flex items-center cursor-pointer"
          (click)="_themeService.setTheme(_themeService.getTheme() === 'light' ? 'dark' : 'light')">
          <ng-icon
            name="heroSun"
            class="dark:hidden! inline-block!" />
          <ng-icon
            name="heroMoon"
            class="hidden! dark:inline-block!" />
        </button>
        <div mgnpNavbarContent>
          <ul>
            <li>
              <button
                mgnpNavbarItem
                [routerLink]="['/', 'getting-started', 'introduction']">
                Documentation
              </button>
            </li>
            <li>
              <a
                mgnpNavbarItem
                href="https://github.com/MGREMY/nx_source"
                target="_blank"
                rel="noopener noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="bg-(--mg-border-emphasis) transition-colors absolute inset-x-0 h-0.5"></div>
    </header>

    <main class="flex overflow-hidden mt-16 p-4 md:max-w-6xl md:mx-auto">
      <section class="mx-auto space-y-8">
        <p class="flex items-center font-semibold">
          <ng-icon
            name="heroQuestionMarkCircle"
            size="24px" />
          The page you're looking for doesn't exist.
        </p>

        <div class="flex flex-col gap-4 sm:flex-row items-center">
          <a
            ngpButton
            mgnpButton
            [routerLink]="['/']">
            Go to home
          </a>
          <a
            ngpButton
            mgnpButton
            [routerLink]="['/', 'getting-started', 'introduction']">
            Go to documentation
          </a>
        </div>
      </section>
    </main>
  `,
  providers: [provideIcons({ heroSun, heroMoon, heroQuestionMarkCircle })],
})
export default class NotFoundPage {
  protected readonly _themeService = inject(APP_THEME_SERVICE);
}
