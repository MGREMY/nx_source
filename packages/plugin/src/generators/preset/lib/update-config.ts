import { NormalizedOptions } from '../preset';

import { updateNxJson, type Tree } from '@nx/devkit';

export function updateConfig(tree: Tree, options: NormalizedOptions) {
  updateNxJson(tree, {
    analytics: false,
    neverConnectToCloud: true,
  });
}
