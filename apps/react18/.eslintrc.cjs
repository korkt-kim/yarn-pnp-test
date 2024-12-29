module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: ['@ypt/eslint-config/react'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['ecosystem.config.js'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
