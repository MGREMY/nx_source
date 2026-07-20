import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

@Component({
  selector: 'app-css-content',
  imports: [NgClass],
  template: `
    <div class="flex flex-col grow">
      @if (availableTabs().size > 1) {
        <div class="flex flex-row justify-around border-b border-b-ui overflow-x-auto">
          @for (name of availableTabs(); track name) {
            <button
              class="w-full min-w-32 items-center py-2 bg-ui hover:cursor-pointer hover:bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))] transition-colors"
              [ngClass]="{
                'border-b border-(--text-color-accent) text-accent': selectedTab() === name,
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
        [innerHTML]="style()"></div>
      <button
        class="w-full items-center rounded-b-md h-8 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))] hover:cursor-pointer transition-colors"
        (click)="isOpen.set(!isOpen())">
        {{ isOpen() === false ? 'Show all' : 'Collapse' }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCssContent {
  private readonly _sanitizer = inject(DomSanitizer);

  private readonly styles = import.meta.glob<string>(
    '../../../../../packages/*/_theme/components/**/*.css',
    {
      import: 'default',
      query: '?raw',
      eager: true,
    }
  );

  readonly name = input.required<string>();
  readonly path = input<'ng-primitives' | 'extended'>('ng-primitives');

  readonly isOpen = signal(false);
  readonly selectedTab = signal<string>('');
  readonly style = signal<SafeHtml | string>('');

  readonly availableTabs = computed(() => {
    const currentName = this.name();
    if (!currentName) return new Set<string>();

    const detectedTabs = new Set<string>();
    const styleKeys = Object.keys(this.styles);
    const nameRegexPattern = new RegExp(`/${currentName}/([a-zA-Z0-9-]+)\\.css$`);

    for (const key of styleKeys) {
      // Add css entrypoint for the current component
      if (key.endsWith(`/${currentName}.css`)) {
        detectedTabs.add(currentName);
        continue;
      }

      const match = key.match(nameRegexPattern);

      if (match && match[1]) {
        detectedTabs.add(match[1]);
      }
    }

    return detectedTabs;
  });

  constructor() {
    effect(() => {
      const currentName = this.name();
      if (!currentName) return;

      this.selectedTab.set(currentName);
    });

    effect(async () => {
      const currentName = untracked(this.name);
      const selectedTab = this.selectedTab();
      if (!selectedTab) return;

      await this.loadStyle(currentName, selectedTab);
    });
  }

  private async loadStyle(name: string, tab: string): Promise<void> {
    const styleKeys = Object.keys(this.styles);
    let nameRegexPattern = new RegExp(`/${name}/${tab}\\.css$`);

    if (name === tab) {
      nameRegexPattern = new RegExp(`/${name}\\.css$`);
    }

    for (const key of styleKeys) {
      const match = key.match(nameRegexPattern);

      if (match) {
        const selectedStyle = this.styles[key];

        await codeToHtml(selectedStyle.trim(), {
          lang: 'postcss',
          themes: {
            light: 'material-theme-lighter',
            dark: 'material-theme-darker',
          },
        })
          .then((x) => this._sanitizer.bypassSecurityTrustHtml(x))
          .then((x) => this.style.set(x));

        break;
      }
    }
  }
}
