import { NormalizedOptions } from '../app';

import { getWorkspaceLayout, joinPathFragments, updateJson, type Tree } from '@nx/devkit';

export function updateTasks(tree: Tree, options: NormalizedOptions) {
  const appsDir = getWorkspaceLayout(tree).appsDir;

  updateJson(tree, joinPathFragments(appsDir, options.name, 'project.json'), (pkgJson) => {
    pkgJson.targets = pkgJson.targets ?? {};

    delete pkgJson.targets['serve-static'];

    pkgJson.targets.build.options.assets = [
      {
        glob: '**/*',
        input: joinPathFragments(appsDir, options.name, 'public'),
        output: '.',
      },
    ];
    pkgJson.targets.build.options.styles = [joinPathFragments(appsDir, options.name, 'public', 'css', 'styles.css')];
    pkgJson.targets.build.configurations.production.fileReplacements = [
      {
        replace: joinPathFragments(appsDir, options.name, 'src', 'environments', 'environment.ts'),
        with: joinPathFragments(appsDir, options.name, 'src', 'environments', 'environment.production.ts'),
      },
    ];
    pkgJson.targets.build.configurations.development.fileReplacements = [
      {
        replace: joinPathFragments(appsDir, options.name, 'src', 'environments', 'environment.ts'),
        with: joinPathFragments(appsDir, options.name, 'src', 'environments', 'environment.development.ts'),
      },
    ];
    pkgJson.targets.build.defaultConfiguration = 'production';

    pkgJson.targets.serve.configurations.production.buildTarget = `${options.name}:build:production`;
    pkgJson.targets.serve.configurations.development.buildTarget = `${options.name}:build:development`;
    pkgJson.targets.serve.defaultConfiguration = 'development';

    return pkgJson;
  });
}
