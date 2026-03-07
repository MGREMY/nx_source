import { SidebarComponent } from '../components/sidebar/sidebar.component';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars4 } from '@ng-icons/heroicons/outline';

import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, NgIcon, RouterOutlet, SidebarComponent],
  standalone: true,
  template: `
    <header>
      <nav class="flex max-w-screen justify-start border-b border-ui p-4 items-center">
        <div class="flex gap-4 items-center">
          <ng-icon
            name="heroBars4"
            class="hover:cursor-pointer md:hidden!"
            (click)="isSidebarOpen.set(true)" />
          <a
            class="cursor-pointer"
            [routerLink]="['/']">
            <span class="sr-only">Brand</span>
            <span class="text-2xl font-semibold whitespace-nowrap">NG-PRIMITIVES</span>
          </a>
        </div>
      </nav>
    </header>

    <main class="overflow-hidden p-4">
      <div class="flex">
        <app-sidebar [(isOpen)]="isSidebarOpen" />

        <router-outlet />
      </div>
    </main>
  `,
  providers: [provideIcons({ heroBars4 })],
})
export default class DocumentationPage {
  readonly isSidebarOpen = signal(false);
}
