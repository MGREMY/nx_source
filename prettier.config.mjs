/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 100,
  proseWrap: 'always',
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 4,
  trailingComma: 'es5',
  importOrder: [
    '^~/(.*)$',
    '^[.]',
    '^@mgremy.*',
    '',
    '(@ng-icon)',
    '(@ngx-translate)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '<BUILTIN_MODULES>',
  ],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};

export default config;
