import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { APP_THEME_SERVICE } from '@mgremy/core';
import {
  MgnpNavbar,
  MgnpNavbarContent,
  MgnpNavbarItem,
} from '@mgremy/ng-primitives-extended/navbar';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars4, heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [
    MgnpNavbar,
    MgnpNavbarContent,
    MgnpNavbarItem,
    RouterLink,
    NgIcon,
    RouterOutlet,
    SidebarComponent,
  ],
  standalone: true,
  template: `
    <header class="fixed top-0 w-full z-100">
      <nav mgnpNavbar>
        <button
          class="inline-flex items-center cursor-pointer"
          (click)="isSidebarOpen.set(!isSidebarOpen())">
          <span class="sr-only">sidebar toggle</span>
          <ng-icon
            name="heroBars4"
            class="md:hidden!" />
        </button>
        <button
          class="inline-flex items-center cursor-pointer"
          (click)="_themeService.setTheme(_themeService.getTheme() === 'light' ? 'dark' : 'light')">
          <span class="sr-only">theme toggle</span>
          <ng-icon
            name="heroSun"
            class="dark:hidden! inline-block!" />
          <ng-icon
            name="heroMoon"
            class="hidden! dark:inline-block!" />
        </button>
        <a
          class="cursor-pointer"
          [routerLink]="['/']">
          <span class="sr-only">Brand</span>
          <span class="text-xl md:text-2xl font-semibold whitespace-nowrap">
            &#64;mgremy/ng-primitives
          </span>
        </a>
        <div mgnpNavbarContent>
          <ul>
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
