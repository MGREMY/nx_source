import { addAngularApp } from './lib/add-angular-app';
import { addDocker } from './lib/add-docker';
import { addMgremy } from './lib/add-mgremy';
import { updateTasks } from './lib/update-tasks';
import type { AppGeneratorSchema } from './schema';

import {
  addDependenciesToPackageJson,
  formatFiles,
  GeneratorCallback,
  names,
  runTasksInSerial,
  type Tree,
} from '@nx/devkit';

function normalizeOptions(schema: AppGeneratorSchema): NormalizedOptions {
  return {
    ...names(schema.name),
    tags: schema.tags ?? '',
    prefix: schema.prefix ?? 'app',
    skipFormat: schema.skipFormat ?? false,
  };
}

export interface NormalizedOptions {
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
  tags: string;
  prefix: string;
  skipFormat: boolean;
}

export async function appGenerator(tree: Tree, options: AppGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(options);

  tasks.push(
    addDependenciesToPackageJson(
      tree,
      {
        /* tailwind */
        tailwindcss: '^4.0.0',
        '@tailwindcss/postcss': '^4.0.0',
        postcss: '^8.0.0',

        /* mgremy */
        'ng-primitives': '^0.122.0',
        '@mgremy/core': '^0.20.0',
        '@mgremy/ng-primitives': '^0.20.0',
        '@mgremy/ng-primitives-extended': '^0.20.0',

        /* other */
        zod: '^4.0.0',
        '@ng-icons/core': '^31.0.0',
        '@ng-icons/heroicons': '^31.0.0',
      },
      {}
    )
  );

  await addAngularApp(tree, normalizedOptions);

  addDocker(tree, normalizedOptions);
  addMgremy(tree, normalizedOptions);
  updateTasks(tree, normalizedOptions);

  if (!normalizedOptions.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default appGenerator;
