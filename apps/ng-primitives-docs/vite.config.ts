;
/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';





// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        root: __dirname,
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
                content: {
                    highlighter: 'shiki',
                    shikiOptions: {
                        highlight: {
                            theme: 'material-theme-lighter',
                        },
                        highlighter: {
                            themes: ['material-theme-lighter', 'material-theme-darker'],
                        },
                    },
                },
            }),
            nxViteTsPaths(),
        ],
        define: {
            'import.meta.vitest': mode !== 'production',
        },
    };
});
