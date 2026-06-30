import type { AngularLibGeneratorSchema } from './schema';

import { addProjectConfiguration, formatFiles, generateFiles, type Tree } from '@nx/devkit';

import * as path from 'path';

export async function angularLibGenerator(tree: Tree, options: AngularLibGeneratorSchema) {
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

export default angularLibGenerator;
