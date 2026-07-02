import { NormalizedOptions } from '../preset';

import { generateFiles, joinPathFragments, type Tree } from '@nx/devkit';

export function addFiles(tree: Tree, options: NormalizedOptions) {
  generateFiles(tree, joinPathFragments(__dirname, '_files', 'add-files'), '.', { tmpl: '' });
}
