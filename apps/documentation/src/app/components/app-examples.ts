import { MgnpLoader } from '@mgremy/ng-primitives-extended/loader';
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath } from '@ng-icons/heroicons/outline';

import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  model,
  signal,
  Type,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

@Component({
  selector: 'app-example',
  imports: [NgComponentOutlet, NgClass, NgIcon, MgnpButton],
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
            <ng-container [ngComponentOutlet]="preview()" />
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
  readonly code = model.required<SafeHtml | string>();
  readonly preview = model.required<Type<unknown> | null>();

  readonly mode = signal<'preview' | 'source'>('preview');

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

@Component({
  selector: 'app-examples',
  imports: [AppExample, MgnpLoader],
  template: `
    @if (isLoading()) {
      <div class="flex items-center justify-center">
        <mgnp-loader />
      </div>
    } @else {
      @if (items().length > 0) {
        @for (item of items(); track $index) {
          <h2>Examples</h2>

          <h3>{{ item.name }}</h3>
          <app-example
            [code]="item.code"
            [preview]="item.preview" />
        }
      }
    }
  `,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppExamples {
  private readonly sanitizer = inject(DomSanitizer);

  private readonly previews = import.meta.glob('../../examples/**/*.ts', {
    import: 'default',
    eager: false,
  });
  private readonly sources = import.meta.glob('../../examples/**/*.ts', {
    import: 'default',
    query: '?raw',
    eager: false,
  });

  readonly name = input.required<string>();

  readonly isLoading = signal(false);
  readonly items = signal<
    {
      preview: Type<unknown> | null;
      code: SafeHtml | string;
      name: string;
    }[]
  >([]);

  constructor() {
    effect(async () => {
      const name = this.name();
      if (!name) return;

      await this.load(name);
    });
  }

  private async load(name: string): Promise<void> {
    this.isLoading.set(true);

    const expectedFilePath = `../../examples/${name}/`;
    const previews = Object.entries(this.previews).filter((x) => x[0].startsWith(expectedFilePath));
    const sources = Object.entries(this.sources).filter((x) => x[0].startsWith(expectedFilePath));

    if (previews.length === 0 || previews.length != sources.length) {
      this.isLoading.set(false);
      return;
    }

    // Map 2 arrays with same key to 1 array with the key, value from x and value from y
    const array = previews.map((x) => ({
      name: x[0],
      preview: x[1],
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      source: sources.find((y) => y[0] === x[0])![1],
    }));

    const items: { preview: Type<unknown> | null; code: SafeHtml | string; name: string }[] = [];

    for (const item of array) {
      const p = (await item.preview()) as Type<unknown>;
      const s = await item
        .source()
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
        .then(this.sanitizer.bypassSecurityTrustHtml);

      const name = item.name.replace(expectedFilePath, '').replace('.ts', '').replace('-', ' ');

      items.push({ preview: p, code: s, name });
    }

    this.items.set(items);
    this.isLoading.set(false);
  }
}
