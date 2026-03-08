import { getExample, getExampleContent } from '../../utils/file-content-loader';

import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideClipboard } from '@ng-icons/lucide';

import { AsyncPipe, NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  Type,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

@Component({
  selector: 'app-example',
  imports: [NgComponentOutlet, NgClass, FormsModule, AsyncPipe],
  template: `
    <div class="relative flex flex-col">
      <div class="absolute inset-x-0 top-0 flex items-center justify-between gap-x-2">
        <div class="flex items-center gap-x-2">
          <!-- Preview/Source Toggle -->
          <div
            class="rounded-lg bg-secondary p-0.5 leading-6 border border-ui *:transition-colors *:duration-200 *:ease-in-out">
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-secondary"
              [ngClass]="{
                'bg-ui text-ui shadow-xs border': mode() === 'preview',
                'text-tertiary hover:text-ui': mode() !== 'preview',
              }"
              (click)="mode.set('preview')">
              Preview
            </button>
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-secondary"
              [ngClass]="{
                'bg-ui text-ui shadow-xs border': mode() === 'source',
                'text-tertiary hover:text-ui': mode() !== 'source',
              }"
              (click)="mode.set('source')">
              Source
            </button>
          </div>
        </div>
      </div>

      <div class="relative mt-10 w-full flex-1">
        @if (mode() === 'preview') {
          <div
            class="not-prose flex h-full min-h-70 w-full p-8 items-center justify-center rounded-xl border border-ui bg-secondary *:contents">
            <ng-container [ngComponentOutlet]="component()" />
          </div>
        }

        <div
          class="rounded-xl bg-transparent"
          [hidden]="mode() !== 'source'">
          <div
            class="h-fit *:mt-0"
            [innerHTML]="sanitizedContent() | async"></div>
        </div>
      </div>
    </div>
  `,
  providers: [provideIcons({ lucideClipboard, lucideCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();

  readonly mode = signal<'preview' | 'source'>('preview');
  readonly component = computed<Type<unknown> | null>(
    () => (getExample(this.name()) as Type<unknown>) ?? null
  );

  readonly content = computed(() => {
    const code = getExampleContent(this.name());

    return codeToHtml(code.trim(), {
      lang: 'angular-ts',
      themes: {
        light: 'material-theme-lighter',
        dark: 'material-theme-darker',
      },
    });
  });
  readonly sanitizedContent = computed(() => {
    return this.content().then((content) => this.sanitizer.bypassSecurityTrustHtml(content));
  });
}
