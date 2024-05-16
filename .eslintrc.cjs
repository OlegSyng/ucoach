/**@type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parserOptions: {
    project: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@tanstack/query'],
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}

module.exports = config
