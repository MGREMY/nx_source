import { MgnpLoader } from '@mgremy/ng-primitives-extended/loader';
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath } from '@ng-icons/heroicons/outline';

import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
  Type,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

@Component({
  selector: 'app-preview',
  imports: [NgComponentOutlet, NgClass, NgIcon, FormsModule, MgnpLoader, MgnpButton],
  template: `
    <div class="relative flex flex-col">
      <div class="absolute inset-x-0 top-0 flex items-center justify-between gap-x-2">
        <div class="flex items-center gap-x-2">
          <!-- Preview/Source Toggle -->
          <div
            class="rounded-lg bg-secondary-ui p-0.5 leading-6 border border-ui transition-colors">
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-ui transition-colors"
              [ngClass]="{
                'bg-ui text-ui shadow-xs border': mode() === 'preview',
                'text-ui/33 hover:text-ui': mode() !== 'preview',
              }"
              (click)="mode.set('preview')">
              Preview
            </button>
            <button
              class="w-16 rounded-md px-2 py-1.5 text-xs font-medium outline-hidden hover:cursor-pointer border-ui transition-colors"
              [ngClass]="{
                'bg-ui text-ui shadow-xs border': mode() === 'source',
                'text-ui/33 hover:text-ui': mode() !== 'source',
              }"
              (click)="mode.set('source')">
              Source
            </button>
          </div>
        </div>

        <div class="flex gap-x-2">
          <button
            mgnpButton
            size="lg"
            (click)="reload()"
            class="flex items-center">
            <span class="sr-only">reload</span>
            <ng-icon name="heroArrowPath" />
          </button>
        </div>
      </div>

      <div class="relative mt-10 w-full flex-1">
        @if (mode() === 'preview') {
          <div
            class="not-prose flex h-full min-h-70 w-full p-8 items-center justify-center rounded-xl border border-ui bg-[color-mix(in_srgb,var(--background-color-ui),light-dark(#000,#fff)_2%)] transition-colors *:contents">
            @if (isLoading()) {
              <mgnp-loader />
            } @else {
              <ng-container [ngComponentOutlet]="preview()" />
            }
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
export class AppPreview {
  private readonly sanitizer = inject(DomSanitizer);

  private readonly previews = import.meta.glob('../../previews/*.ts', {
    import: 'default',
    eager: false,
  });
  private readonly sources = import.meta.glob('../../previews/*.ts', {
    import: 'default',
    query: '?raw',
    eager: false,
  });

  readonly name = input.required<string>();

  readonly isLoading = signal(false);
  readonly mode = signal<'preview' | 'source'>('preview');
  readonly code = signal<SafeHtml | string>('');
  readonly preview = signal<Type<unknown> | null>(null);

  constructor() {
    effect(async () => {
      const name = this.name();
      if (!name) return;

      await this.load(name);
    });
  }

  private async load(name: string): Promise<void> {
    const expectedFileName = `../../previews/${name}.ts`;

    this.isLoading.set(true);

    const preview = Object.entries(this.previews).find((x) => x[0] === expectedFileName);
    const source = Object.entries(this.sources).find((x) => x[0] === expectedFileName);

    if (!preview || !source) return;

    await preview[1]().then((x) => this.preview.set(x as Type<unknown>));
    await source[1]()
      .then((x) => x.trim())
      .then(
        async (x) =>
          await codeToHtml(x, {
            lang: 'angular-ts',
            themes: {
              light: 'material-theme-lighter',
              dark: 'material-theme-darker',
            },
          })
      )
      .then(this.sanitizer.bypassSecurityTrustHtml)
      .then((x) => this.code.set(x));

    this.isLoading.set(false);
  }

  protected reload(): void {
    const preview = this.preview();
    const code = this.code();

    this.preview.set(null);
    this.code.set('');

    setTimeout(() => {
      this.preview.set(preview);
      this.code.set(code);
    }, 0);
  }
}
