import { NormalizedOptions } from '../app';

import { generateFiles, joinPathFragments, type Tree } from '@nx/devkit';

export function addDocker(tree: Tree, options: NormalizedOptions) {
  generateFiles(tree, joinPathFragments(__dirname, '_files', 'add-docker'), `.`, {
    tmpl: '',
    ...options,
  });
}
