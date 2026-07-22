import type { ComponentCssGeneratorGeneratorSchema } from './schema';

import { createProjectGraphAsync, joinPathFragments, type Tree } from '@nx/devkit';
import { SyncGeneratorResult } from 'nx/src/utils/sync-generators';

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { extname, join, relative, sep } from 'path';

/**
 * Recursivly find all .css files in a directory
 * @param dir Directory to scan
 * @returns The list of CSS files path
 */
function findCssFiles(dir: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      files.push(...findCssFiles(fullPath));
    } else if (extname(fullPath) === '.css') {
      files.push(fullPath);
    }
  }

  return files;
}

export async function componentCssGeneratorGenerator(
  tree: Tree,
  options: ComponentCssGeneratorGeneratorSchema
): Promise<SyncGeneratorResult> {
  const projectGraph = await createProjectGraphAsync();
  const ngPrimitives = projectGraph.nodes['ng-primitives'];
  const ngPrimitivesExtended = projectGraph.nodes['ng-primitives-extended'];

  if (!ngPrimitives || !ngPrimitivesExtended) {
    console.warn('Could not fund ng-primitives or ng-primitives-extended in project graph');
    return {
      outOfSyncMessage: 'Could not fund ng-primitives or ng-primitives-extended in project graph',
    };
  }

  const workspaceRoot = tree.root;
  const projects = [
    { name: 'ng-primitives', data: ngPrimitives.data },
    { name: 'ng-primitives-extended', data: ngPrimitivesExtended.data },
  ];

  for (const project of projects) {
    const projectRoot = join(workspaceRoot, project.data.root);
    const cssFiles = findCssFiles(projectRoot);

    const componentGroups = new Map<string, string[]>();

    for (const filePath of cssFiles) {
      const relativePath = relative(projectRoot, filePath);
      let componentGroup: string;

      // If file is direct child of '_theme', then its group is its name
      // Otherwise, its group is its parent
      const filePathSplit = relativePath.split(sep);
      if (['_theme', 'components'].includes(filePathSplit[filePathSplit.length - 2])) {
        componentGroup = filePathSplit[filePathSplit.length - 1].replace('.css', '');
      } else {
        componentGroup = filePathSplit[filePathSplit.length - 2];
      }

      if (!componentGroups.has(componentGroup)) {
        componentGroups.set(componentGroup, []);
      }

      componentGroups.get(componentGroup)?.push(filePath);
    }

    for (const [componentName, files] of componentGroups) {
      const entries: { name: string; content: string }[] = [];

      for (const file of files) {
        const fileSplit = file.split(sep);
        entries.push({
          name: fileSplit[fileSplit.length - 1].replace('.css', ''),
          content: readFileSync(file, 'utf-8'),
        });
      }

      const outputPath = joinPathFragments(
        'tmp',
        project.data.root,
        'css',
        `${componentName}.json`
      );

      tree.write(outputPath, JSON.stringify(entries, null, 2));
    }
  }
}

export default componentCssGeneratorGenerator;
