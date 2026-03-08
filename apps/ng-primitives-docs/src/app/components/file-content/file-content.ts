import { getNgPrimitivesCssContent } from '../../utils/file-content-loader';

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BundledLanguage, BundledTheme, CodeToHastOptions, codeToHtml } from 'shiki';

@Component({
  selector: 'app-file-content',
  imports: [AsyncPipe],
  template: `<div [innerHTML]="sanitizedContent() | async"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileContent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly type = input<'ng-primitives-css'>('ng-primitives-css');

  readonly language = computed(() => {
    switch (this.type()) {
      case 'ng-primitives-css':
        return 'css';
    }
  });
  readonly code = computed(() => {
    switch (this.type()) {
      case 'ng-primitives-css':
        return getNgPrimitivesCssContent(this.name());
    }
  });
  readonly content = computed(() => {
    const code = this.code();
    const language = this.language();
    const options: CodeToHastOptions<BundledLanguage, BundledTheme> = {
      lang: language,
      themes: {
        light: 'material-theme-lighter',
        dark: 'material-theme-darker',
      },
    };

    return codeToHtml(code, options);
  });
  readonly sanitizedContent = computed(() => {
    return this.content().then((content) => this.sanitizer.bypassSecurityTrustHtml(content));
  });
}
