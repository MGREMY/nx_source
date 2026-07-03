/// <reference types="vitest" />

import analog from '@analogjs/platform';
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
    base: '/',
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      target: ['esnext'],
    },
    plugins: [
      analog({
        ssr: false,
        static: true,
        liveReload: true,
        fileReplacements: [
          {
            replace: 'apps/documentation/src/environments/environment.ts',
            with: `apps/documentation/src/environments/environment.${mode}.ts`,
          },
        ],
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
      sourceQueryPlugin(),
    ],
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
