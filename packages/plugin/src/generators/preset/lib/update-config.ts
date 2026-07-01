import { NormalizedOptions } from '../../app/app';

import { updateNxJson, type Tree } from '@nx/devkit';

export function updateConfig(tree: Tree, options: NormalizedOptions) {
  updateNxJson(tree, {
    analytics: false,
    neverConnectToCloud: true,
  });
}
