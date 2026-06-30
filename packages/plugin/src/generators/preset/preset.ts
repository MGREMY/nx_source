import type { PresetGeneratorSchema } from './schema';

import { addProjectConfiguration, formatFiles, generateFiles, type Tree } from '@nx/devkit';

import * as path from 'path';

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  console.debug(options);

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

export default presetGenerator;
