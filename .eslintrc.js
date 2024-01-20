/* eslint-disable */
const path = require('node:path')

module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['jsx-a11y', 'prettier', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        semi: false,
        singleQuote: true,
        bracketSameLine: false,
        useTabs: false,
        printWidth: 80,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        jsxBracketSameLine: true,
        htmlWhitespaceSensitivity: 'css',
      },
      {
        usePrettierrc: false,
      },
    ],
    'max-len': [1, { code: 80 }],
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/semi': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-shadow': 'off',
    indent: [
      'warn',
      2,
      { SwitchCase: 1, ignoredNodes: ['ConditionalExpression'] },
    ],
    'import/newline-after-import': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: 'return' },
    ],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    quotes: ['error', 'single'],
    semi: 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'linebreak-style': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'warn',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts', '**/*.stories.*'],
      rules: {
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        'import/no-anonymous-default-export': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
      extends: [
        'prettier',
        'plugin:storybook/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
  ],
  ignorePatterns: ['!**/*', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
}
