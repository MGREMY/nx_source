import { APP_THEME_SERVICE, APP_TRANSLATION_SERVICE } from '@mgremy/core';
import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpMenu, MgnpMenuItem } from '@mgremy/ng-primitives/menu';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagCp, flagUs } from '@ng-icons/flag-icons';
import { heroBars4, heroMoon, heroSun } from '@ng-icons/heroicons/outline';

import { Component, computed, inject } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  imports: [
    NgIcon,
    NgpMenuTrigger,
    NgpMenu,
    MgnpMenu,
    NgpMenuItem,
    MgnpMenuItem,
    NgpButton,
    MgnpButton,
  ],
  standalone: true,
  template: `
    <header>
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
              class="!dark:hidden !inline-block" />
            <ng-icon
              name="heroMoon"
              class="!hidden !dark:inline-block" />
          </button>
          <button
            [ngpMenuTrigger]="langDropdown"
            mgnpButton>
            <ng-icon
              [name]="_currentLanguageIcon()"
              class="hover:cursor-pointer" />
          </button>
        </div>
      </nav>
      <div class="bg-(--mg-border-emphasis) absolute inset-x-0 h-0.5"></div>
    </header>

    <main class="overflow-hidden p-4">
      <h1>Index</h1>
    </main>

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
  `,
  providers: [provideIcons({ flagCp, flagUs, heroBars4, heroSun, heroMoon })],
})
export default class IndexPage {
  private readonly _translationService = inject(APP_TRANSLATION_SERVICE);
  protected readonly _themeService = inject(APP_THEME_SERVICE);

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
