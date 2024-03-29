/**@type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parserOptions: {
    project: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    "@typescript-eslint/consistent-type-definitions": "off",
  },
}

module.exports = config
