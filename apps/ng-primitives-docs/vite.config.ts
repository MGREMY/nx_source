/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    base: './',
    cacheDir: '../../node_modules/.vite',
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        ssr: false,
        static: true,
        liveReload: true,
      }),
      nxViteTsPaths(),
    ],
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
