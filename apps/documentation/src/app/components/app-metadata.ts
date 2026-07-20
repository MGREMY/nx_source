import { MgnpLoader } from '@mgremy/ng-primitives-extended/loader';

import { MarkdownComponent } from '@analogjs/content';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { marked } from 'marked';

type ComponentGroup = {
  name: string;
  package: string;
  project: string;
  directives: {
    name: string;
    type: 'component' | 'directive';
    selector: string;
    exportAs: string;
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
  imports: [MarkdownComponent, MgnpLoader],
  template: `
    @if (isLoading()) {
      <mgnp-loader />
    } @else {
      <analog-markdown [content]="markdown()" />
    }
  `,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMetadata {
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
  readonly markdown = signal<string>('');

  constructor() {
    effect(async () => {
      const name = this.name();

      if (!name) return this.selectedMetadata.set(undefined);

      await this.loadMetadata(name);
      await this.generateMarkdown();
    });
  }

  private async loadMetadata(name: string): Promise<void> {
    this.isLoading.set(true);

    const metadatas = Object.entries(this.metadatas);

    for (const metadata of metadatas) {
      const splitPath = metadata[0].split('/');

      if (splitPath[splitPath.length - 1] === `${name}.json`) {
        await metadata[1]()
          .then((x) => JSON.parse(x) as ComponentGroup)
          .then((x) => this.selectedMetadata.set(x))
          .then(() => this.isLoading.set(false));

        return;
      }
    }

    this.isLoading.set(false);
  }

  private async generateMarkdown(): Promise<void> {
    const metadata = this.selectedMetadata();

    if (!metadata) return;

    const markdown: string[] = [];

    for (const directive of metadata.directives) {
      markdown.push(`### ${directive.name}`);
      markdown.push('');

      markdown.push('#### Inputs');
      if (directive.inputs.length === 0 || directive.inputs.every((x) => x.fromHostDirective)) {
        markdown.push('-----');
      } else {
        markdown.push('| name | possible values | default value |');
        markdown.push('|---|---|---|');
        for (const input of directive.inputs) {
          if (input.fromHostDirective) continue;

          const possibleValues = input.possibleValues?.map((x) => `**${x}**`).join(' / ') ?? '';
          const defaultValue = input.defaultValue ?? '';

          markdown.push(`| ${input.name} | ${possibleValues} | ${defaultValue} |`);
        }
      }

      markdown.push('#### Outputs');
      if (directive.outputs.length === 0 || directive.outputs.every((x) => x.fromHostDirective)) {
        markdown.push('-----');
      } else {
        markdown.push('| name | type |');
        markdown.push('|---|---|');
        for (const output of directive.outputs) {
          if (output.fromHostDirective) continue;

          markdown.push(`| ${output.name} | ${output.type} |`);
        }
      }

      if (directive.hostDirectives.length > 0) {
        markdown.push('#### Host directive mapping');

        for (const hostDirective of directive.hostDirectives) {
          markdown.push(`- ${hostDirective.directive}`);

          if (hostDirective.inputs.length > 0 || hostDirective.outputs.length > 0) {
            markdown.push('| type | name | forwarded to |');
            markdown.push('|---|---|---|');

            if (hostDirective.inputs.length > 0) {
              for (const input of hostDirective.inputs) {
                const [forwarded, name] = input.split(':');

                markdown.push(`| **input** | ${name} | ${forwarded} |`);
              }
            }

            if (hostDirective.outputs.length > 0) {
              for (const input of hostDirective.outputs) {
                const [forwarded, name] = input.split(':');

                markdown.push(`| **output** | ${name} | ${forwarded} |`);
              }
            }
          }
        }
      }
    }

    this.markdown.set(await marked(markdown.join('\n')));
  }
}
