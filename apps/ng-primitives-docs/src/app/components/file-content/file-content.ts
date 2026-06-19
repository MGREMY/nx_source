import { getFile } from '../../utils/file-content-loader';

import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BundledLanguage, BundledTheme, CodeToHastOptions, codeToHtml } from 'shiki';

@Component({
  selector: 'app-file-content',
  imports: [AsyncPipe, NgClass],
  template: `
    <div class="flex flex-col grow">
      @if (availableTabs().length > 1) {
        <div class="flex flex-row justify-around border-b border-b-ui overflow-x-auto">
          @for (name of availableTabs(); track name) {
            <button
              class="w-full min-w-32 items-center py-2 bg-ui hover:cursor-pointer hover:bg-ui-hover transition-colors"
              [ngClass]="{
                'border-b border-(--text-color-active) text-active': selectedTab() === name,
              }"
              (click)="selectedTab.set(name)">
              {{ name }}
            </button>
          }
        </div>
      }
      <div
        class="*:pb-0 *:mb-0 *:mt-0 transition-[max-height]"
        [ngClass]="{
          'max-h-48 overflow-y-clip': isOpen() === false,
          'max-h-128 overflow-y-auto': isOpen() === true,
        }"
        [innerHTML]="sanitizedContent() | async"></div>
      <button
        class="w-full items-center h-8 bg-ui-hover hover:cursor-pointer transition-colors"
        (click)="isOpen.set(!isOpen())">
        {{ isOpen() === false ? 'Show all' : 'Collapse' }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileContent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly type = input<'ng-primitives-css' | 'ng-primitives-extended-css'>('ng-primitives-css');

  readonly isOpen = signal(false);

  readonly language = computed(() => {
    switch (this.type()) {
      case 'ng-primitives-css':
      case 'ng-primitives-extended-css':
        return 'postcss';
    }
  });
  readonly availableContents = computed(() => {
    switch (this.type()) {
      case 'ng-primitives-css':
        return getFile(this.name(), 'ng-primitives');
      case 'ng-primitives-extended-css':
        return getFile(this.name(), 'ng-primitives-extended');
    }
  });
  readonly availableTabs = computed(() => this.availableContents().map((x) => x.name));
  readonly selectedTab = linkedSignal(() => this.availableContents()[0].name);
  readonly content = computed(() => {
    const code = this.availableContents().filter((x) => x.name === this.selectedTab())[0].content;
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
