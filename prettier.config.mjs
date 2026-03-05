/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
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
