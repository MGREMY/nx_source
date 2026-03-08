import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { APP_THEME_SERVICE } from '@mgremy/core';
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars4, heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [RouterLink, NgIcon, RouterOutlet, SidebarComponent, MgnpButton, NgpButton],
  standalone: true,
  template: `
    <header class="fixed top-0 w-full z-100">
      <nav class="flex max-w-screen justify-between p-4 items-center bg-secondary">
        <div class="flex gap-2 items-center">
          <ng-icon
            name="heroBars4"
            class="hover:cursor-pointer md:hidden!"
            (click)="isSidebarOpen.set(!isSidebarOpen())" />
          <a
            class="cursor-pointer"
            [routerLink]="['/']">
            <span class="sr-only">Brand</span>
            <span class="text-xl md:text-2xl font-semibold whitespace-nowrap">&#64;mgremy/ng-primitives</span>
          </a>
        </div>
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

    <main class="overflow-hidden mt-16 p-8">
      <div class="flex">
        <app-sidebar [(isOpen)]="isSidebarOpen" />

        <router-outlet />
      </div>
    </main>
  `,
  providers: [provideIcons({ heroBars4, heroSun, heroMoon })],
})
export default class DocumentationPage {
  protected readonly _themeService = inject(APP_THEME_SERVICE);

  readonly isSidebarOpen = signal(false);
}
