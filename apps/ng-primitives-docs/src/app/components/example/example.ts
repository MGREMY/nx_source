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
  linkedSignal,
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
            class="rounded-lg bg-ui-secondary p-0.5 leading-6 border border-ui *:transition-colors *:duration-200 *:ease-in-out">
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-ui-secondary"
              [ngClass]="{
                'bg-ui text-ui shadow-xs border': mode() === 'preview',
                'text-ui-tertiary hover:text-ui': mode() !== 'preview',
              }"
              (click)="mode.set('preview')">
              Preview
            </button>
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-ui-secondary"
              [ngClass]="{
                'bg-ui text-ui shadow-xs border': mode() === 'source',
                'text-ui-tertiary hover:text-ui': mode() !== 'source',
              }"
              (click)="mode.set('source')">
              Source
            </button>
          </div>
        </div>

        <div class="flex gap-x-2">
          <!-- Style Selector -->
          @if (availableNames().length > 1) {
            <div class="relative hidden sm:block **:transition-colors duration-200 ease-in-out">
              <select
                class="appearance-none rounded-md bg-ui text-ui border-ui-secondary border px-3 py-2 pr-8 text-xs font-medium shadow-xs hover:cursor-pointer outline-hidden focus-visible:z-10"
                aria-label="Select example style"
                [ngModel]="selectedName()">
                @for (name of availableNames(); track name) {
                  <option
                    (click)="selectedName.set(name)"
                    [value]="name">
                    {{ name }}
                  </option>
                }
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-ui">
                <svg
                  class="size-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="relative mt-10 w-full flex-1">
        @if (mode() === 'preview') {
          <div
            class="not-prose flex h-full min-h-70 w-full p-8 items-center justify-center rounded-xl border border-ui bg-ui-secondary *:contents">
            <ng-container [ngComponentOutlet]="selectedExample()" />
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
  readonly selectedName = linkedSignal(
    () => this.availableNames().filter((x) => x === this.name())[0]
  );

  // Get the list of available names
  readonly availableNames = computed<string[]>(() => {
    const examples = this.availableContents();

    return examples.map((x) => {
      const splitPath = x.path.split('/');

      return fromFileName(splitPath[splitPath.length - 1]);
    });
  });

  // Get available example and content for selected example name
  private readonly availableExamples = computed<{ path: string; content: Type<unknown> }[]>(
    () => getExample(this.name()) as { path: string; content: Type<unknown> }[]
  );
  private readonly availableContents = computed<{ path: string; content: string }[]>(() =>
    getExampleContent(this.name())
  );

  private readonly selectedContent = computed(() => {
    const contents = this.availableContents();
    const selected = this.selectedName();

    return (
      contents.find((x) => {
        const splitPath = x.path.split('/');

        return (
          splitPath[splitPath.length - 1].split('.')[0] ===
          toFileName(selected.split(' ').join('-'))
        );
      })?.content ?? ''
    );
  });

  readonly selectedExample = computed(() => {
    const contents = this.availableExamples();
    const selected = this.selectedName();

    return (
      contents.find((x) => {
        const splitPath = x.path.split('/');

        return (
          splitPath[splitPath.length - 1].split('.')[0] ===
          toFileName(selected.split(' ').join('-'))
        );
      })?.content ?? null
    );
  });
  readonly sanitizedContent = computed(async () => {
    const code = this.selectedContent();

    return await codeToHtml(code.trim(), {
      lang: 'angular-ts',
      themes: {
        light: 'material-theme-lighter',
        dark: 'material-theme-darker',
      },
    }).then((content) => this.sanitizer.bypassSecurityTrustHtml(content));
  });
}

const fromFileName = (value: string): string => value.split('.')[0].split('-').join(' ');
const toFileName = (value: string): string => value.split('.')[0].split(' ').join('-');
