import { MgnpLoader } from '@mgremy/ng-primitives-extended/loader';

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
  imports: [MgnpLoader],
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
                <div class="ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
                  <div
                    class="grid grid-cols-[0.5fr_1fr_1fr] border-b border-b-ui px-4 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                    <span>Type</span>
                    <span>Name</span>
                    <span>Forwarded to</span>
                  </div>

                  @for (input of hostDirective.inputs; track $index) {
                    @let inputSplit = input.split(':');

                    <div class="grid grid-cols-[0.5fr_1fr_1fr] border-b border-b-ui px-4 py-1">
                      <code class="font-semibold">Input</code>
                      <code class="text-secondary">{{ inputSplit[1] }}</code>
                      <code class="text-secondary">{{ inputSplit[0] }}</code>
                    </div>
                  }

                  @for (outputs of hostDirective.outputs; track $index) {
                    @let outputsSplit = outputs.split(':');

                    <div class="grid grid-cols-[0.5fr_1fr_1fr] border-b border-b-ui px-4 py-1">
                      <code class="font-semibold">Output</code>
                      <code class="text-secondary">{{ outputsSplit[1] }}</code>
                      <code class="text-secondary">{{ outputsSplit[0] }}</code>
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

            <div class="ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
              <div
                class="grid grid-cols-[0.75fr_1fr_2fr_1fr] border-b border-b-ui px-4 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                <span>Name</span>
                <span>Type</span>
                <span>Possible values</span>
                <span>Default value</span>
              </div>

              @let inputs = directive.inputs.filter((x) => !x.fromHostDirective);

              @for (input of inputs; track $index) {
                <div class="grid grid-cols-[0.75fr_1fr_2fr_1fr] border-b border-b-ui px-4 py-1">
                  <code>{{ input.name }}</code>
                  <code class="text-secondary">{{ input.type }}</code>
                  <span>
                    @if (input.possibleValues) {
                      @for (possibleValue of input.possibleValues; track $index) {
                        <code class="font-semibold">{{ possibleValue }}</code>

                        @if ($index < input.possibleValues.length - 1) {
                          /
                        }
                      }
                    }
                  </span>
                  <code class="text-secondary">{{ input.defaultValue }}</code>
                </div>
              }
            </div>
          }

          @if (
            directive.outputs.length !== 0 && !directive.outputs.every((x) => x.fromHostDirective)
          ) {
            <h4 class="ml-4 mt-4 text-lg font-semibold">Ouputs</h4>

            <div class="ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
              <div
                class="grid grid-cols-[1fr_1fr] border-b border-b-ui px-2 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                <span>Name</span>
                <span>Type</span>
              </div>

              @let outputs = directive.outputs.filter((x) => !x.fromHostDirective);

              @for (output of outputs; track $index) {
                <div class="grid grid-cols-[1fr_1fr] border-b border-b-ui px-4 py-1">
                  <code>{{ output.name }}</code>
                  <code class="text-secondary">{{ output.type }}</code>
                </div>
              }
            </div>
          }

          @if (directive.host && directive.host.length > 0) {
            <h4 class="ml-4 mt-4 text-lg font-semibold">CSS</h4>

            <div class="ml-8 mt-2 border border-ui rounded-md *:last:border-b-0">
              <div
                class="grid grid-cols-[1fr_1fr] border-b border-b-ui px-4 py-1 bg-[color-mix(in_srgb,var(--background-color-ui),var(--mg-state-hover-mix))]">
                <span>Class</span>
                <span>Custom class</span>
              </div>

              @for (host of directive.host; track $index) {
                @if (host.name === 'class') {
                  @let value = host.value.replaceAll("'", '');
                  @let class = value.split(' ').find((x) => !x.includes('-c-'));
                  @let customClass = value.split(' ').find((x) => x.includes('-c-'));

                  <div class="grid grid-cols-[1fr_1fr] border-b border-b-ui px-4 py-1">
                    <code class="text-secondary">{{ class }}</code>
                    <code class="text-secondary">{{ customClass }}</code>
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
  providers: [],
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
