import { NormalizedOptions } from '../app';

import { generateFiles, getWorkspaceLayout, joinPathFragments, type Tree } from '@nx/devkit';

import { readFileSync } from 'fs';

export function addMgremy(tree: Tree, options: NormalizedOptions) {
  const appsDir = getWorkspaceLayout(tree).appsDir;

  generateFiles(
    tree,
    joinPathFragments(__dirname, '_files', 'add-mgremy'),
    joinPathFragments(appsDir, options.name),
    { tmpl: '', ...options }
  );
  tree.write(
    joinPathFragments(appsDir, options.name, 'public', 'fonts', 'roboto.ttf'),
    readFileSync(joinPathFragments(__dirname, '_files', 'roboto.ttf'))
  );
}
