import { presetGenerator } from './preset';
import { PresetGeneratorSchema } from './schema';

import { joinPathFragments, readNxJson, readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

const SECONDS = 1000;

describe(
  'preset generator',
  () => {
    let tree: Tree;
    const options: PresetGeneratorSchema = { ci: 'github' };

    beforeEach(async () => {
      tree = createTreeWithEmptyWorkspace({
        layout: 'apps-libs',
      });

      await presetGenerator(tree, options);
    });

    it('should have nx configuration done', async () => {
      const nxConfig = readNxJson(tree);

      expect(nxConfig).toBeDefined();

      expect(nxConfig?.analytics).toEqual(false);
      expect(nxConfig?.neverConnectToCloud).toEqual(true);
    });

    it('should have required files', async () => {
      const eslintFolderChildren = tree.children(joinPathFragments('tools', 'eslint'));

      expect(eslintFolderChildren).toContain('angular.config.mjs');
      expect(eslintFolderChildren).toContain('base.config.mjs');
    });

    it('should have github ci configuration done', async () => {
      expect(tree.exists(joinPathFragments('.github', 'pull_request.yml')));
    });
  },
  15 * SECONDS
);
