import { appGenerator } from './app';
import { AppGeneratorSchema } from './schema';

import { joinPathFragments, readProjectConfiguration, type Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

const SECONDS = 1000;

describe('app generator', () => {
  describe(
    'required and optional parameters',
    () => {
      let tree: Tree;
      const appName = 'appName';

      beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace({
          layout: 'apps-libs',
        });
      });

      it('should run successfully with required parameters', async () => {
        await appGenerator(tree, {
          name: appName,
          skipFormat: true,
        });

        const config = readProjectConfiguration(tree, appName);

        expect(config).toBeDefined();
      });

      it('should run successfully with prefix parameter', async () => {
        await appGenerator(tree, {
          name: appName,
          prefix: 'app',
          skipFormat: true,
        });

        const config = readProjectConfiguration(tree, appName);

        expect(config).toBeDefined();
      });

      it('should run successfully with tags parameter', async () => {
        await appGenerator(tree, {
          name: appName,
          tags: 'some random tags',
          skipFormat: true,
        });

        const config = readProjectConfiguration(tree, appName);

        expect(config).toBeDefined();
      });

      it('should run successfully with all parameters', async () => {
        await appGenerator(tree, {
          name: appName,
          prefix: 'app',
          tags: 'some random tags',
          skipFormat: true,
        });

        const config = readProjectConfiguration(tree, appName);

        expect(config).toBeDefined();
      });
    },
    15 * SECONDS
  );

  describe('application configuration', () => {
    let tree: Tree;
    const options: AppGeneratorSchema = {
      name: 'myTestApp',
      prefix: 'app',
      tags: 'some random tags',
      skipFormat: true,
    };

    beforeEach(async () => {
      tree = createTreeWithEmptyWorkspace({
        layout: 'apps-libs',
      });

      await appGenerator(tree, options);
    });

    it('should create angular application', async () => {
      const config = readProjectConfiguration(tree, options.name);

      expect(config).toBeDefined();

      expect(config.name).toEqual(options.name);
      expect(config.tags).toEqual([options.tags]);
      expect(config.projectType).toEqual('application');
      expect(config.root).toEqual(joinPathFragments('apps', options.name));
    });

    it('should create docker configuration', async () => {
      expect(tree.exists(joinPathFragments('docker', options.name))).toBeTruthy();

      const dockerFolderChildren = tree.children(joinPathFragments('docker', options.name));

      expect(dockerFolderChildren).toContain('Dockerfile');
      expect(dockerFolderChildren).toContain('entrypoint.sh');
      expect(dockerFolderChildren).toContain('nginx.conf');
    });

    it('should update application files', async () => {
      const applicationFolderPath = joinPathFragments('apps', options.name);
      const publicFolderPath = joinPathFragments(applicationFolderPath, 'public');
      const srcFolderPath = joinPathFragments(applicationFolderPath, 'src');

      expect(tree.exists(joinPathFragments(applicationFolderPath, 'eslint.config.mjs'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(applicationFolderPath, 'postcss.config.json'))).toBeTruthy();

      expect(tree.exists(joinPathFragments(publicFolderPath, 'assets'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(publicFolderPath, 'css'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(publicFolderPath, 'i18n'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(publicFolderPath, 'fonts'))).toBeTruthy();

      expect(tree.children(joinPathFragments(publicFolderPath, 'assets'))).toContain('config.json');
      expect(tree.children(joinPathFragments(publicFolderPath, 'css'))).toContain('styles.css');
      expect(tree.children(joinPathFragments(publicFolderPath, 'i18n'))).toContain('en-US.json');
      expect(tree.children(joinPathFragments(publicFolderPath, 'i18n'))).toContain('fr-FR.json');
      expect(tree.children(joinPathFragments(publicFolderPath, 'fonts'))).toContain('roboto.ttf');

      expect(tree.exists(joinPathFragments(srcFolderPath, 'main.ts'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(srcFolderPath, 'app', 'app.config.ts'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(srcFolderPath, 'environments', 'environment.ts'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(srcFolderPath, 'environments', 'environment.development.ts'))).toBeTruthy();
      expect(tree.exists(joinPathFragments(srcFolderPath, 'environments', 'environment.ts'))).toBeTruthy();
    });
  });
});
