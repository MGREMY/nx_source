import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

type ComponentGroup = {
  name: string;
  content: string;
};

@Component({
  selector: 'app-css-content',
  imports: [NgClass],
  template: `
    <div class="flex flex-col grow">
      @if (selectedMetadata() && selectedMetadata()!.length > 1) {
        <div class="flex flex-row justify-around border-b border-b-ui overflow-x-auto">
          @for (componentGroup of selectedMetadata(); track componentGroup.name) {
            <button
              class="w-full min-w-32 items-center py-2 bg-ui hover:cursor-pointer hover:bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))] transition-colors"
              [ngClass]="{
                'border-b border-(--text-color-accent) text-accent':
                  selectedStyle() === componentGroup.name,
              }"
              (click)="selectedStyle.set(componentGroup.name)">
              {{ componentGroup.name }}
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
  private readonly sanitizer = inject(DomSanitizer);

  private readonly metadatas = import.meta.glob<string>(
    '../../../../../tmp/packages/**/css/*.json',
    {
      import: 'default',
      query: '?source',
      eager: false,
    }
  );

  readonly name = input.required<string>();

  readonly isLoading = signal(false);
  readonly isOpen = signal(false);
  readonly selectedMetadata = signal<ComponentGroup[] | undefined>(undefined);
  readonly selectedStyle = signal<string>('');
  readonly style = signal<SafeHtml | string>('');

  constructor() {
    effect(async () => {
      const name = this.name();
      if (!name) return;

      await this.loadMetadata(name);
    });

    effect(async () => {
      const selectedMetadata = this.selectedMetadata();
      const selectedStyle = this.selectedStyle();
      if (!selectedMetadata || !selectedStyle) return;

      await this.generateStyle();
    });
  }

  private async loadMetadata(name: string): Promise<void> {
    this.isLoading.set(true);

    const metadatas = Object.entries(this.metadatas);

    for (const metadata of metadatas) {
      if (metadata[0].endsWith(`${name}.json`)) {
        await metadata[1]()
          .then((x) => JSON.parse(x) as ComponentGroup[])
          .then((x) =>
            x.sort((y, z) =>
              // If y.name === name, first
              // Else If z.name === name, first
              // Else compare string
              y.name === name ? -1 : z.name === name ? 1 : y.name.localeCompare(z.name)
            )
          )
          .then((x) => this.selectedMetadata.set(x))
          .then(() => this.isLoading.set(false));

        // Default set the selected style to the metadata file name (without extension)
        this.selectedStyle.set(name);

        return;
      }
    }

    this.isLoading.set(false);
  }

  private async generateStyle(): Promise<void> {
    const selectedStyle = this.selectedStyle();
    const selectedMetadata = this.selectedMetadata();
    const componentGroup = selectedMetadata?.find((x) => x.name === selectedStyle);

    if (!componentGroup) return;

    this.style.set(
      await codeToHtml(componentGroup.content.trim(), {
        lang: 'postcss',
        themes: {
          light: 'material-theme-lighter',
          dark: 'material-theme-darker',
        },
      }).then(this.sanitizer.bypassSecurityTrustHtml)
    );
  }
}
