import { APP_TRANSLATION_SERVICE } from '@mgremy/core';
import { MgnpMenu, MgnpMenuItem } from '@mgremy/ng-primitives/menu';
import { MgnpNavbar, MgnpNavbarContent, MgnpNavbarItem } from '@mgremy/ng-primitives/navbar';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagCp, flagUs } from '@ng-icons/flag-icons';
import { heroBars4 } from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  selector: 'app-root',
  imports: [
    MgnpNavbar,
    RouterLink,
    MgnpNavbarContent,
    RouterLinkActive,
    TitleCasePipe,
    TranslatePipe,
    NgIcon,
    NgpMenuTrigger,
    NgpMenu,
    MgnpMenu,
    NgpMenuItem,
    MgnpMenuItem,
    RouterOutlet,
    MgnpNavbarItem,
  ],
  standalone: true,
  template: `
    <header>
      <nav mgnpNavbar>
        <div class="my-auto gap-2">
          <a
            class="flex cursor-pointer space-x-3"
            [routerLink]="['/']">
            <span class="sr-only">Brand</span>
            <span class="text-2xl font-semibold whitespace-nowrap"> NG-PRIMITIVES </span>
          </a>
        </div>

        <div
          mgnpNavbarContent
          #navbarContent="mgnpNavbarContent">
          <ul>
            <li>
              <a
                mgnpNavbarItem
                [routerLink]="['/', 'components']"
                routerLinkActive="page"
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page">
                {{ 'nav.components' | translate | titlecase }}
              </a>
            </li>
            <li>
              <a
                mgnpNavbarItem
                [routerLink]="['/', 'styling']"
                routerLinkActive="page"
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page">
                {{ 'nav.styling' | translate | titlecase }}
              </a>
            </li>
          </ul>
        </div>

        <div class="my-auto flex flex-row items-center justify-start">
          <ng-icon
            [ngpMenuTrigger]="langDropdown"
            [name]="_currentLanguageIcon()"
            class="hover:cursor-pointer m-2" />
          <ng-template #langDropdown>
            <div
              ngpMenu
              mgnpMenu
              class="z-100">
              @for (lang of _availableLanguages; track lang.code) {
                <button
                  ngpMenuItem
                  mgnpMenuItem
                  (click)="onSetLang(lang.code)"
                  class="flex gap-2">
                  <ng-icon [name]="lang.icon" />
                  <span>{{ lang.name }}</span>
                </button>
              }
            </div>
          </ng-template>

          <ng-icon
            name="heroBars4"
            class="ml-5 rounded-full hover:cursor-pointer md:hidden!"
            (click)="navbarContent.toggle()" />
        </div>
      </nav>
    </header>

    <main class="overflow-hidden p-4">
      <router-outlet />
    </main>
  `,
  providers: [provideIcons({ flagCp, flagUs, heroBars4 })],
})
export class AppComponent {
  private readonly _translationService = inject(APP_TRANSLATION_SERVICE);

  readonly _availableLanguages = [
    {
      code: 'fr-FR',
      name: 'Français',
      icon: 'flagCp',
    },
    {
      code: 'en-US',
      name: 'English',
      icon: 'flagUs',
    },
  ];

  readonly _currentLanguageIcon = computed(
    () =>
      this._availableLanguages.find((x) => x.code === this._translationService.currentLanguage())
        ?.icon ?? ''
  );

  onSetLang(code: string): void {
    this._translationService.setLanguage(code);
  }
}
