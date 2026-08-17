import { MgnpLoader } from '@mgremy/ng-primitives-extended/loader';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';

import { NgClass } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';

type ComponentGroup = {
  name: string;
  package: string;
  project: string;
  directives: {
    name: string;
    type: 'component' | 'directive';
    selector: string;
    exportAs: string;
    host: {
      name: string;
      value: string;
    }[];
    inputs: {
      name: string;
      type: string;
      defaultValue?: string;
      possibleValues?: string[];
      fromHostDirective?: string;
    }[];
    outputs: {
      name: string;
      type?: string;
      fromHostDirective: string;
    }[];
    hostDirectives: {
      directive: string;
      inputs: string[];
      outputs: string[];
    }[];
  }[];
};

@Component({
  selector: 'app-metadata',
  imports: [MgnpLoader, NgIcon, NgClass],
  template: `
    @if (isLoading()) {
      <mgnp-loader />
    } @else {
      @let metadata = selectedMetadata();

      @if (metadata) {
        @for (directive of metadata.directives; track $index) {
          <h3
            [id]="'metadata-directive-' + directive.name"
            class="ml-2 mt-6 text-xl font-bold">
            {{ directive.name }}
          </h3>

          @if (directive.hostDirectives.length > 0) {
            @for (hostDirective of directive.hostDirectives; track $index) {
              <h4 class="ml-4 mt-4 text-lg">
                Host directive mapping -
                <span class="font-normal text-secondary">{{ hostDirective.directive }}</span>
              </h4>

              @if (hostDirective.inputs.length > 0 || hostDirective.outputs.length > 0) {
                <div class="md:ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
                  <div
                    class="grid grid-cols-[1fr] sm:grid-cols-[0.5fr_1fr] md:grid-cols-[0.5fr_1fr_1fr] border-b border-b-ui px-4 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                    <span class="hidden sm:inline">Type</span>
                    <span>Name</span>
                    <span class="hidden md:inline">Forwarded to</span>
                  </div>

                  @for (input of hostDirective.inputs; track $index) {
                    @let inputSplit = input.split(':');
                    @let rowName =
                      'metadata-directive-' + directive.name + 'inputs-' + inputSplit[1];

                    @let name = inputSplit[1];
                    @let forwardedTo = inputSplit[0];

                    <button
                      (click)="toggleRow(rowName)"
                      class="overflow-hidden cursor-pointer w-full items-center text-start grid grid-cols-[1fr_auto] sm:grid-cols-[0.5fr_1fr_auto] md:grid-cols-[0.5fr_1fr_1fr_auto] border-b border-b-ui px-4 py-1">
                      <code class="hidden sm:inline font-semibold">Input</code>
                      <code class="text-secondary">{{ name }}</code>
                      <code class="hidden md:inline text-secondary">{{ forwardedTo }}</code>
                      <ng-icon
                        class="transition-transform"
                        [ngClass]="{ 'rotate-180': expandedRows().includes(rowName) }"
                        name="heroChevronDownMini" />
                    </button>
                    <div
                      class="px-4 py-2 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]"
                      [ngClass]="{
                        hidden: !expandedRows().includes(rowName),
                      }">
                      <dl class="overflow-x-auto text-start grid grid-cols-[1fr_3fr] gap-2.5">
                        <dt class="font-medium">Type</dt>
                        <dd class="text-secondary">Input</dd>

                        <dt class="font-medium">Name</dt>
                        <dd class="text-secondary">{{ name }}</dd>

                        <dt class="font-medium">Forwarded to</dt>
                        <dd class="text-secondary">{{ forwardedTo }}</dd>
                      </dl>
                    </div>
                  }

                  @for (outputs of hostDirective.outputs; track $index) {
                    @let outputSplit = outputs.split(':');
                    @let rowName =
                      'metadata-directive-' + directive.name + 'outputs-' + outputSplit[1];

                    @let name = outputSplit[1];
                    @let forwardedTo = outputSplit[0];

                    <button
                      (click)="toggleRow(rowName)"
                      class="overflow-hidden cursor-pointer w-full text-start grid grid-cols-[1fr_auto] sm:grid-cols-[0.5fr_1fr_auto] md:grid-cols-[0.5fr_1fr_1fr_auto] border-b border-b-ui px-4 py-1">
                      <code class="hidden sm:inline font-semibold">Output</code>
                      <code class="text-secondary">{{ name }}</code>
                      <code class="hidden md:inline text-secondary">{{ forwardedTo }}</code>
                      <ng-icon
                        class="transition-transform"
                        [ngClass]="{ 'rotate-180': expandedRows().includes(rowName) }"
                        name="heroChevronDownMini" />
                    </button>
                    <div
                      class="px-4 py-2 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]"
                      [ngClass]="{
                        hidden: !expandedRows().includes(rowName),
                      }">
                      <dl class="overflow-x-auto text-start grid grid-cols-[1fr_3fr] gap-2.5">
                        <dt class="font-medium">Type</dt>
                        <dd class="text-secondary">Input</dd>

                        <dt class="font-medium">Name</dt>
                        <dd class="text-secondary">{{ name }}</dd>

                        <dt class="font-medium">Forwarded to</dt>
                        <dd class="text-secondary">{{ forwardedTo }}</dd>
                      </dl>
                    </div>
                  }
                </div>
              }
            }
          }

          @if (
            directive.inputs.length !== 0 && !directive.inputs.every((x) => x.fromHostDirective)
          ) {
            <h4 class="ml-4 mt-4 text-lg font-semibold">Inputs</h4>

            <div class="md:ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
              <div
                class="grid grid-cols-[1fr_auto] sm:grid-cols-[0.75fr_1fr_auto] md:grid-cols-[0.75fr_1fr_2fr_1fr_auto] border-b border-b-ui px-4 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                <span>Name</span>
                <span class="hidden sm:inline">Type</span>
                <span class="hidden md:inline">Possible values</span>
                <span class="hidden md:inline">Default value</span>
              </div>

              @let inputs = directive.inputs.filter((x) => !x.fromHostDirective);

              @for (input of inputs; track $index) {
                @let rowName = 'metadata-directive-inputs-' + input.name;

                @let name = input.name;
                @let type = input.type;
                @let possibleValues = input.possibleValues?.join(' / ') ?? '';
                @let defaultValue = input.defaultValue;

                <button
                  (click)="toggleRow(rowName)"
                  class="overflow-hidden cursor-pointer w-full items-center text-start grid grid-cols-[1fr_auto] sm:grid-cols-[0.75fr_1fr_auto] md:grid-cols-[0.75fr_1fr_2fr_1fr_auto] border-b border-b-ui px-4 py-1">
                  <code>{{ name }}</code>
                  <code class="hidden sm:inline text-secondary">{{ type }}</code>
                  <code class="hidden md:inline font-semibold">{{ possibleValues }}</code>
                  <code class="hidden md:inline text-secondary">{{ input.defaultValue }}</code>
                  <ng-icon
                    class="transition-transform"
                    [ngClass]="{ 'rotate-180': expandedRows().includes(rowName) }"
                    name="heroChevronDownMini" />
                </button>
                <div
                  class="px-4 py-2 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]"
                  [ngClass]="{
                    hidden: !expandedRows().includes(rowName),
                  }">
                  <dl class="overflow-x-auto text-start grid grid-cols-[1fr_3fr] gap-2.5">
                    <dt class="font-medium">Type</dt>
                    <dd class="text-secondary">{{ type }}</dd>

                    <dt class="font-medium">Posssible values</dt>
                    <dd class="text-secondary font-semibold">{{ possibleValues }}</dd>

                    <dt class="font-medium">Default value</dt>
                    <dd class="text-secondary font-semibold">{{ defaultValue }}</dd>
                  </dl>
                </div>
              }
            </div>
          }

          @if (
            directive.outputs.length !== 0 && !directive.outputs.every((x) => x.fromHostDirective)
          ) {
            <h4 class="ml-4 mt-4 text-lg font-semibold">Ouputs</h4>

            <div class="md:ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
              <div
                class="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] border-b border-b-ui px-2 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                <span>Name</span>
                <span class="hidden sm:inline">Type</span>
              </div>

              @let outputs = directive.outputs.filter((x) => !x.fromHostDirective);

              @for (output of outputs; track $index) {
                @let rowName = 'metadata-directive-outputs-' + output.name;

                @let name = output.name;
                @let type = output.type;

                <button
                  (click)="toggleRow(rowName)"
                  class="overflow-hidden cursor-pointer w-full items-center text-start grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] border-b border-b-ui px-4 py-1">
                  <code>{{ name }}</code>
                  <code class="hidden sm:inline text-secondary">{{ type }}</code>
                  <ng-icon
                    class="transition-transform"
                    [ngClass]="{ 'rotate-180': expandedRows().includes(rowName) }"
                    name="heroChevronDownMini" />
                </button>
                <div
                  class="px-4 py-2 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]"
                  [ngClass]="{
                    hidden: !expandedRows().includes(rowName),
                  }">
                  <dl class="overflow-x-auto text-start grid grid-cols-[1fr_3fr] gap-2.5">
                    <dt class="font-medium">Type</dt>
                    <dd class="text-secondary">{{ type }}</dd>
                  </dl>
                </div>
              }
            </div>
          }

          @if (directive.host && directive.host.length > 0) {
            <h4 class="ml-4 mt-4 text-lg font-semibold">CSS</h4>

            <div class="md:ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
              <div
                class="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] border-b border-b-ui px-4 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                <span>Class</span>
                <span class="hidden sm:inline">Custom class</span>
              </div>

              @for (host of directive.host; track $index) {
                @let rowName = 'metadata-directive-css-' + directive.name;

                @if (host.name === 'class') {
                  @let value = host.value.replaceAll("'", '');

                  @let class = value.split(' ').find((x) => !x.includes('-c-'));
                  @let customClass = value.split(' ').find((x) => x.includes('-c-'));

                  <button
                    (click)="toggleRow(rowName)"
                    class="overflow-hidden cursor-pointer w-full items-center text-start grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] border-b border-b-ui px-4 py-1">
                    <code class="text-secondary">{{ class }}</code>
                    <code class="hidden sm:inline text-secondary">{{ customClass }}</code>
                    <ng-icon
                      class="transition-transform"
                      [ngClass]="{ 'rotate-180': expandedRows().includes(rowName) }"
                      name="heroChevronDownMini" />
                  </button>
                  <div
                    class="px-4 py-2 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]"
                    [ngClass]="{
                      hidden: !expandedRows().includes(rowName),
                    }">
                    <dl class="overflow-x-auto text-start grid grid-cols-[1fr_3fr] gap-2.5">
                      <dt class="font-medium">Class</dt>
                      <dd class="text-secondary">{{ class }}</dd>

                      <dt class="font-medium">Custom class</dt>
                      <dd class="text-secondary">{{ customClass }}</dd>
                    </dl>
                  </div>
                }
              }
            </div>
          }

          @if ($index < metadata.directives.length - 1) {
            <div class="h-px my-8 bg-(--border-color-ui) border-0"></div>
          }
        }
      }
    }
  `,
  providers: [provideIcons({ heroChevronDownMini })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'not-prose text-ui' },
})
export class AppMetadata {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);

  private readonly metadatas = import.meta.glob<string>(
    '../../../../../tmp/packages/**/metadata/*.json',
    {
      import: 'default',
      query: '?source',
      eager: false,
    }
  );

  readonly name = input.required<string>();

  readonly isLoading = signal(false);
  readonly selectedMetadata = signal<ComponentGroup | undefined>(undefined);
  readonly expandedRows = signal<string[]>([]);

  constructor() {
    effect(async () => {
      const name = this.name();

      if (!name) return this.selectedMetadata.set(undefined);

      await this.loadMetadata(name);
    });

    afterNextRender(
      () => {
        this.elementRef.nativeElement.dispatchEvent(
          new CustomEvent('metadatasLoaded', { bubbles: true })
        );
      },
      { injector: this.injector }
    );
  }

  toggleRow(name: string): void {
    const exists = this.expandedRows().includes(name);

    if (exists) this.expandedRows.update((r) => r.filter((x) => x !== name));
    else this.expandedRows.update((r) => [...r, name]);
  }

  private async loadMetadata(name: string): Promise<void> {
    this.isLoading.set(true);

    const metadatas = Object.entries(this.metadatas);

    for (const metadata of metadatas) {
      if (metadata[0].endsWith(`${name}.json`)) {
        await metadata[1]()
          .then((x) => JSON.parse(x) as ComponentGroup)
          .then((x) => this.selectedMetadata.set(x))
          .then(() => this.isLoading.set(false));

        return;
      }
    }

    this.isLoading.set(false);
  }
}
