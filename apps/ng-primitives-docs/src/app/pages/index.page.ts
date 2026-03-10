import { APP_THEME_SERVICE } from '@mgremy/core';
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [NgpButton, MgnpButton, NgIcon, RouterLink],
  standalone: true,
  template: `
    <header class="fixed top-0 w-full z-100">
      <nav class="nav">
        <div class="flex flex-1 justify-between md:max-w-5xl md:justify-end md:mx-auto">
          <div class="flex gap-4 items-center">
            <button
              class="nav-item"
              (click)="
                _themeService.setTheme(_themeService.getTheme() === 'light' ? 'dark' : 'light')
              ">
              <ng-icon
                name="heroSun"
                class="dark:hidden! inline-block!" />
              <ng-icon
                name="heroMoon"
                class="hidden! dark:inline-block!" />
            </button>
          </div>
          <div class="flex">
            <button
              class="nav-item"
              [routerLink]="['/', 'getting-started', 'introduction']">
              Documentation
            </button>
            <a
              href="https://github.com/MGREMY/nx_source"
              target="_blank"
              rel="noopener noreferrer"
              class="nav-item">
              Github
            </a>
          </div>
        </div>
      </nav>
      <div
        class="transition-colors duration-200 ease-in-out bg-(--mg-border-emphasis) absolute inset-x-0 h-0.5"></div>
    </header>

    <main class="overflow-hidden mt-16 p-4 md:max-w-6xl md:mx-auto">
      <section class="flex flex-col pt-16 space-y-16 items-center">
        <div class="space-y-2">
          <h1 class="font-bold text-2xl sm:text-5xl text-blue">@mgremy/ng-primitives</h1>
          <p class="px-4 font-semibold text-lg sm:text-3xl">Styled wrappers for ng-primitives</p>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-16">
          <a
            ngpButton
            mgnpButton
            [routerLink]="['/', 'getting-started', 'introduction']">
            Get Started
          </a>
          <div class="flex gap-4">
            <a
              ngpButton
              mgnpButton
              color="secondary"
              href="https://github.com/MGREMY/nx_source"
              target="_blank"
              rel="noopener noreferrer">
              Github
            </a>
            <a
              ngpButton
              mgnpButton
              color="secondary"
              href="https://www.npmjs.com/package/@mgremy/ng-primitives"
              target="_blank"
              rel="noopener noreferrer">
              NpmJS
            </a>
          </div>
        </div>
      </section>
    </main>
  `,
  providers: [provideIcons({ heroSun, heroMoon })],
})
export default class IndexPage {
  protected readonly _themeService = inject(APP_THEME_SERVICE);
}
