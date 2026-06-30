import { appGenerator } from './app';
import { AppGeneratorSchema } from './schema';

import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

const SECONDS = 1000;

describe('app generator', () => {
  let tree: Tree;
  const options: AppGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace({
      layout: 'apps-libs'
    });
  });

  it('should run successfully', async () => {
    await appGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  }, 240 * SECONDS);
});
