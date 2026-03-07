import { APP_TRANSLATION_SERVICE } from '@mgremy/core';
import { MgnpMenu, MgnpMenuItem } from '@mgremy/ng-primitives/menu';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagCp, flagUs } from '@ng-icons/flag-icons';
import { heroBars4 } from '@ng-icons/heroicons/outline';

import { Component, computed, inject } from '@angular/core';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  imports: [NgIcon, NgpMenuTrigger, NgpMenu, MgnpMenu, NgpMenuItem, MgnpMenuItem],
  standalone: true,
  template: `
    <header>
      <nav class="flex max-w-screen justify-end border-b border-ui p-4 items-center">
        <ul class="flex gap-4 items-center">
          <li>
            <ng-icon
              [ngpMenuTrigger]="langDropdown"
              [name]="_currentLanguageIcon()"
              class="hover:cursor-pointer" />
          </li>
        </ul>
      </nav>
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
  providers: [provideIcons({ flagCp, flagUs, heroBars4 })],
})
export default class IndexPage {
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
