import { NormalizedOptions } from '../app';

// Thanks to AnalogJS : https://github.com/analogjs/analog/blob/beta/packages/nx-plugin/src/generators/app/lib/add-angular-app.ts
//
// `@nx/angular` exposes its generators only through its `exports` map, which
// this project's classic `node` module resolution does not consult. Reference
// the built declaration directly so the type resolves; the runtime entry is
// imported below via `@nx/angular/generators`.
import type { applicationGenerator } from '@nx/angular/dist/generators';
import { getWorkspaceLayout, Tree } from '@nx/devkit';

type ApplicationSchema = Parameters<typeof applicationGenerator>[1];

export async function addAngularApp(tree: Tree, options: NormalizedOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const angularGenerator = await import('@nx/angular/generators');
  const appsDir = getWorkspaceLayout(tree).appsDir;

  const appOptions: ApplicationSchema = {
    name: options.name,
    directory: `${appsDir}/${options.name}`,
    prefix: options.prefix,
    linter: 'eslint',
    unitTestRunner: 'vitest-angular' as ApplicationSchema['unitTestRunner'],
    e2eTestRunner: 'playwright' as ApplicationSchema['e2eTestRunner'],
    standalone: true,
    bundler: 'esbuild',
    skipFormat: true,
    tags: options.tags,
    zoneless: true,
    ssr: false,
    skipTests: false,
  };

  await angularGenerator.applicationGenerator(tree, {
    ...appOptions,
  });
}
