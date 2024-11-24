const path = require('path')

module.exports = {
  root: true,
  extends: ['prettier'],
  plugins: ['react-hooks', 'react', 'import', 'simple-import-sort'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off', // React import 필수 해제
    'react/jsx-props-no-spreading': 'off', // props spreading 허용
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.tsx', '.jsx', 'spec.js'] },
    ],
    'react/function-component-definition': 'off',

    'import/no-unresolved': 0,
    'import/no-default-export': 2,
    'import/no-duplicates': 1,

    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { variables: false },
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
      },
      parserOptions: {
        project: ['./tsconfig.json', './**/tsconfig.json'],
      },
    },
    {
      files: ['apps/todo/**/*.ts?(x)', 'apps/todo/**/*.js?(x)'],
      overrides: [
        {
          files: ['apps/todo/src/pages{/**,}/*.{ts,tsx}'],
          rules: {
            'import/no-default-export': 0,
            'import/prefer-default-export': 2,
          },
        },
      ],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/apps/todo/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/ui/**/*.ts?(x)', 'packages/ui/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/ui/tsconfig.json`),
          },
        },
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'spec.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    browser: true,
    es6: true,
  },
}
