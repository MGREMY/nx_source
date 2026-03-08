import { APP_THEME_SERVICE } from '@mgremy/core';
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagCp, flagUs } from '@ng-icons/flag-icons';
import { heroBars4, heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { Component, inject } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [NgIcon, NgpButton, MgnpButton],
  standalone: true,
  template: `
    <header class="fixed top-0 w-full z-100">
      <nav class="flex max-w-screen justify-end p-4 items-center bg-secondary/75">
        <div class="flex gap-4 items-center">
          <button
            ngpButton
            mgnpButton
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
      </nav>
      <div class="bg-(--mg-border-emphasis) absolute inset-x-0 h-0.5"></div>
    </header>

    <main class="overflow-hidden mt-16 p-4">
      <h1>Index</h1>
    </main>
  `,
  providers: [provideIcons({ flagCp, flagUs, heroBars4, heroSun, heroMoon })],
})
export default class IndexPage {
  protected readonly _themeService = inject(APP_THEME_SERVICE);
}
