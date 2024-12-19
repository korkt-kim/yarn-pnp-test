module.exports = {
  plugins: ['react-hooks', 'react', '@tanstack/query'],
  extends: ['./base.js'],
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/stable-query-client': 'error',

    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off', // React import 필수 해제
    'react/jsx-props-no-spreading': 'off', // props spreading 허용
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.tsx', '.jsx', 'spec.js'] },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      // boolean 타입 변수는 has, is 등으로 시작하지 않도록
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['camelCase'],
        custom: {
          regex: '^(is|has|should|can|did|will)[A-Z]([A-Za-z0-9]?)+',
          match: false,
        },
      },
      // page, layout 파일은 page, layout으로 끝나야 함
      {
        selector: 'variable',
        filter: {
          regex: '.*\\.(page|layout|loading|error|not-found)\\.[jt]sx?$',
          match: true,
        },
        format: ['camelCase'],
        suffix: ['Page', 'Layout', 'Loading', 'Error', 'NotFound'],
      },
      // API 라우트 핸들러는 GET, POST 등으로 시작
      {
        selector: 'function',
        filter: {
          regex: 'route\\.[jt]s$',
          match: true,
        },
        format: ['PascalCase'],
        prefix: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      },
      // 컴포넌트는 PascalCase
      {
        selector: 'function',
        format: ['PascalCase'],
        modifiers: ['exported'],
      },
      // 인터페이스는 I로 시작
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      // enum 멤버는 UPPER_CASE
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
  },
  overrides: [
    {
      files: [
        './src/pages{/**,}/*.{ts,tsx}',
        './src/App.tsx',
        './src/index.tsx',
      ],
      rules: {
        'import/no-default-export': 0,
        'import/prefer-default-export': 2,
      },
    },
    {
      files: ['src/App.tsx', 'src/index.tsx'],
      rules: {
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'function-declaration',
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
