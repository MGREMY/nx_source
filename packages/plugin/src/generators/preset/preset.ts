import { addCi } from './lib/add-ci';
import { addFiles } from './lib/add-files';
import { updateConfig } from './lib/update-config';
import type { PresetGeneratorSchema } from './schema';

import { formatFiles, GeneratorCallback, runTasksInSerial, type Tree } from '@nx/devkit';

function normalizeOptions(schema: PresetGeneratorSchema): NormalizedOptions {
  return {
    ci: schema.ci,
  };
}

export interface NormalizedOptions {
  ci: 'none' | 'github';
}

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(options);

  addFiles(tree, normalizedOptions);
  updateConfig(tree, normalizedOptions);

  if (normalizedOptions.ci !== 'none') {
    addCi(tree, normalizedOptions);
  }

  await formatFiles(tree);

  return runTasksInSerial(...tasks);
}

export default presetGenerator;
