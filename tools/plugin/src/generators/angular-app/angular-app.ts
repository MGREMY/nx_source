import type { AngularAppGeneratorSchema } from './schema';

import { addProjectConfiguration, formatFiles, generateFiles, type Tree } from '@nx/devkit';

import * as path from 'path';

export async function angularAppGenerator(tree: Tree, options: AngularAppGeneratorSchema) {
  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default angularAppGenerator;
