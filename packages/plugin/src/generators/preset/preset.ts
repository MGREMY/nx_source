import { addCi } from './lib/add-ci';
import { addFiles } from './lib/add-files';
import { updateConfig } from './lib/update-config';
import type { PresetGeneratorSchema } from './schema';

import { formatFiles, type Tree } from '@nx/devkit';

function normalizeOptions(schema: PresetGeneratorSchema): NormalizedOptions {
  return {
    ci: schema.ci,
  };
}

export interface NormalizedOptions {
  ci: 'none' | 'github';
}

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema): Promise<() => void> {
  const normalizedOptions = normalizeOptions(options);

  addFiles(tree, normalizedOptions);
  updateConfig(tree, normalizedOptions);

  if (normalizedOptions.ci !== 'none') {
    addCi(tree, normalizedOptions);
  }

  return () => {
    formatFiles(tree);
  };
}

export default presetGenerator;
