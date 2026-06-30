import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/plugin',
  plugins: [
    tsconfigPaths(),
    viteStaticCopy({
      targets: [{ src: '*.md', dest: '.' }],
    }),
  ],
  test: {
    name: 'plugin',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/plugin',
      provider: 'v8' as const,
    },
  },
}));
