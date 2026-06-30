import type { AppGeneratorSchema } from './schema';

import { addProjectConfiguration, formatFiles, generateFiles, names, type Tree } from '@nx/devkit';

import * as path from 'path';
import { addAngularApp } from './lib/add-angular-app';

export interface NormalizedOptions {
  names: {
    name: string;
    className: string;
    propertyName: string;
    constantName: string;
    fileName: string;
  };
  tags: string;
}

export async function appGenerator(tree: Tree, options: AppGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await addAngularApp(tree, normalizedOptions);

  await formatFiles(tree);
}

function normalizeOptions(tree: Tree, schema: AppGeneratorSchema): NormalizedOptions {
  return {
    names: names(schema.name),
    tags: schema.tags ?? '',
  };
}

export default appGenerator;
