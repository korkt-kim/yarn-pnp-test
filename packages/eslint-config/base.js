module.exports = {
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowDefaultProject: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    /* import */
    'import/no-unresolved': 0,
    'import/no-default-export': 2,
    'import/no-duplicates': 1,

    /* simple-import-sort */
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,

    /* @typescript-eslint */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    // boolean 타입 변수에 동사를 붙이지 않습니다.
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
      // 상수는 UPPER_CASE
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['UPPER_CASE', 'camelCase'], // camelCase도 허용 (리액트 훅, 함수 등을 위해)
      },
      // 인터페이스는 I로 시작
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      // 타입은 PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // enum 멤버는 UPPER_CASE
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    // !를 사용하지 않습니다.
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
  },

  // 전역 변수 설정. JSX를 전역 변수로 선언하고 수정 불가능하게 설정.
  globals: {
    JSX: 'readonly',
  },

  // @TR: tsocnfig 못찾는 에러 해결
  ignorePatterns: ['.eslintrc.cjs'],

  settings: {
    'import/resolver': {
      typescript: true,
    },
  },
}
