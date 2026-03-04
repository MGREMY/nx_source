/* eslint-disable @nx/enforce-module-boundaries */
import baseConfig from '../../eslint.config.mjs';
import angular from '../../tools/eslint/angular.config.mjs';

import tseslint from 'typescript-eslint';

export default [
  ...baseConfig,
  ...angular,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: ['./tsconfig.json'],
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
