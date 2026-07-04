import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath } from '@ng-icons/heroicons/outline';

import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  Type,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

@Component({
  selector: 'app-example',
  imports: [NgComponentOutlet, NgClass, NgIcon, FormsModule],
  template: `
    <div class="relative flex flex-col">
      <div class="absolute inset-x-0 top-0 flex items-center justify-between gap-x-2">
        <div class="flex items-center gap-x-2">
          <!-- Preview/Source Toggle -->
          <div
            class="rounded-lg bg-ui-secondary p-0.5 leading-6 border border-ui transition-colors">
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-ui-secondary transition-colors"
              [ngClass]="{
                'bg-ui text-ui shadow-xs border': mode() === 'preview',
                'text-ui-tertiary hover:text-ui': mode() !== 'preview',
              }"
              (click)="mode.set('preview')">
              Preview
            </button>
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-ui-secondary transition-colors"
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
          @if (availableAlternatives().size > 1) {
            <div class="relative hidden sm:block">
              <select
                class="appearance-none rounded-md bg-ui text-ui border-ui-secondary transition-colors border px-3 py-2 pr-8 text-xs font-medium shadow-xs hover:cursor-pointer outline-hidden focus-visible:z-10"
                aria-label="Select example style"
                [(ngModel)]="selectedAlternative">
                @for (name of availableAlternatives(); track name) {
                  <option [value]="name">
                    {{ name }}
                  </option>
                }
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-ui transition-colors">
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
          <button
            (click)="reloadSelectedExample()"
            class="flex items-center rounded-md bg-ui text-ui border-ui-secondary transition-colors border px-3 py-2 shadow-xs hover:cursor-pointer outline-hidden">
            <span class="sr-only">reload</span>
            <ng-icon name="heroArrowPath" />
          </button>
        </div>
      </div>

      <div class="relative mt-10 w-full flex-1">
        @if (mode() === 'preview') {
          <div
            class="not-prose flex h-full min-h-70 w-full p-8 items-center justify-center rounded-xl border border-ui bg-ui-secondary transition-colors *:contents">
            <ng-container [ngComponentOutlet]="component()" />
          </div>
        }

        <div
          class="rounded-xl bg-transparent transition-colors"
          [hidden]="mode() !== 'source'">
          <div
            class="h-fit *:mt-0"
            [innerHTML]="code()"></div>
        </div>
      </div>
    </div>
  `,
  providers: [provideIcons({ heroArrowPath })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppExample {
  private readonly _sanitizer = inject(DomSanitizer);

  private readonly examples = import.meta.glob('../examples/**/*.ts', {
    import: 'default',
    eager: true,
  });

  private readonly sources = import.meta.glob('../examples/**/*.ts', {
    import: 'default',
    query: '?raw',
    eager: true,
  });

  readonly name = input.required<string>();

  readonly selectedAlternative = signal<string>('');
  readonly component = signal<Type<unknown> | null>(null);
  readonly code = signal<SafeHtml | string>('');
  readonly mode = signal<'preview' | 'source'>('preview');

  readonly availableAlternatives = computed(() => {
    const currentName = this.name();
    if (!currentName) return new Set<string>();

    const detectedAlternative = new Set<string>();
    const exampleComponentKeys = Object.keys(this.examples);
    const nameRegexPattern = new RegExp(`${currentName}/([a-zA-Z0-9-]+)\\.example\\.ts$`);

    for (const key of exampleComponentKeys) {
      const match = key.match(nameRegexPattern);

      if (match && match[1]) {
        detectedAlternative.add(match[1]);
      }
    }

    return detectedAlternative;
  });

  constructor() {
    effect(() => {
      const currentName = this.name();
      if (!currentName) return;

      this.selectedAlternative.set(currentName);
    });

    effect(async () => {
      const currentName = untracked(this.name);
      const selectedAlternative = this.selectedAlternative();
      if (!selectedAlternative) return;

      await this.loadExample(currentName, selectedAlternative);
    });
  }

  private async loadExample(name: string, alternative: string): Promise<void> {
    const exampleComponentKeys = Object.keys(this.examples);
    const nameRegexPattern = new RegExp(`${name}/${alternative}\\.example\\.ts$`);

    for (const key of exampleComponentKeys) {
      const match = key.match(nameRegexPattern);

      if (match) {
        const selectedExample = this.examples[key];
        const selectedSource = this.sources[key];

        this.component.set(selectedExample as Type<unknown>);

        await codeToHtml(selectedSource.trim(), {
          lang: 'angular-ts',
          themes: {
            light: 'material-theme-lighter',
            dark: 'material-theme-darker',
          },
        })
          .then((x) => this._sanitizer.bypassSecurityTrustHtml(x))
          .then((x) => this.code.set(x));

        break;
      }
    }
  }

  reloadSelectedExample(): void {
    const currentComponent = this.component();
    const currentCode = this.code();

    this.component.set(null);
    this.code.set('');

    setTimeout(() => {
      this.component.set(currentComponent);
      this.code.set(currentCode);
    }, 0);
  }
}
