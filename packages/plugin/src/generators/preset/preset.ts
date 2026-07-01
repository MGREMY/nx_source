import { addFiles } from './lib/add-files';
import { updateConfig } from './lib/update-config';
import type { PresetGeneratorSchema } from './schema';

import { formatFiles, type Tree } from '@nx/devkit';

function normalizeOptions(_: PresetGeneratorSchema): NormalizedOptions {
  return {};
}

export interface NormalizedOptions extends Object {}

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema): Promise<() => void> {
  const normalizedOptions = normalizeOptions(options);

  addFiles(tree, normalizedOptions);
  updateConfig(tree, normalizeOptions);

  return () => {
    formatFiles(tree);
  };
}

export default presetGenerator;
