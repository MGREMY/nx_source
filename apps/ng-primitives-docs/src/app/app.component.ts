import { APP_TRANSLATION_SERVICE } from '@mgremy/core';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private readonly _translationService = inject(APP_TRANSLATION_SERVICE);

  protected readonly _availableLanguages = [
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

  protected readonly _currentLanguageIcon = computed(
    () =>
      this._availableLanguages.find(
        (x) => x.code === this._translationService.currentLanguage(),
      )?.icon ?? '',
  );

  onSetLang(code: string): void {
    this._translationService.setLanguage(code);
  }
}
