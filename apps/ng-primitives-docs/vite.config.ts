/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { globSync } from 'glob';
import { defineConfig, Plugin } from 'vite';

import { readFileSync } from 'fs';

function sourceQueryPlugin(): Plugin {
  return {
    name: 'source-query-plugin',
    transform(code: string, id: string) {
      // Check if the import has a ?source query
      if (id.includes('?source')) {
        // Get the source file path
        const source = readFileSync(id.replace('?source', '')).toString();

        // Replace the import statement with a string literal
        code = `export default \`${source.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;`;
      }
      return code;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    base: mode === 'production' ? '/ng-primitives' : '',
    optimizeDeps: {
      include: [
        '@angular/common',
        '@angular/forms',
        'marked',
        'marked-gfm-heading-id',
        'marked-highlight',
        '@ng-icons/**',
        '@ng-primitives/**',
        '@mgremy/**/**',
      ],
    },
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        ssr: false,
        static: true,
        liveReload: true,
        fileReplacements: [
          {
            replace: 'apps/ng-primitives-docs/src/environments/environment.ts',
            with: `apps/ng-primitives-docs/src/environments/environment.${mode}.ts`,
          },
        ],
        prerender: {
          routes: async () => [
            '/',
            ...globSync('apps/ng-primitives-docs/src/app/pages/**/*.md').map((file) => {
              return (
                '/' +
                file
                  .replace('apps/documentation/src/app/pages/(documentation)/', '')
                  .replace('apps/documentation/src/app/pages/', '')
                  .replace('.md', '')
              );
            }),
          ],
          sitemap: {
            host: 'https://angularprimitives.com/',
          },
        },
        content: {
          highlighter: 'shiki',
          shikiOptions: {
            highlight: {
              themes: {
                light: 'material-theme-lighter',
                dark: 'material-theme-darker',
              },
            },
            highlighter: {
              additionalLangs: ['bash'],
              themes: ['material-theme-lighter', 'material-theme-darker'],
            },
          },
        },
      }),
      nxViteTsPaths(),
      sourceQueryPlugin(),
    ],
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
