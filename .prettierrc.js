module.exports = {
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: [
    '^[./]',
    '^@emotion(.*)$',
    '^@static/(.*)$',
    '^@/(.*)$',
    '^@(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  parser: 'typescript',
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  singleQuote: true,
  tabWidth: 4,
  trailingComma: 'all',
};
