module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.js', '.tsx'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  ignorePatterns: [
    'node_modules',
  ],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': ['error', {
      html: 'ignore',
      custom: 'ignore',
      exceptions: [''],
    }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
    ],
    'max-params': [2, 3],
    indent: 2,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-underscore-dangle': 0,
    camelcase: 0,
    'linebreak-style': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-continue': 0,
    'no-param-reassign': 0,
    'no-undef': 0,
    'no-loop-func': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'react/static-property-placement': 'off',
    'no-restricted-syntax': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-plusplus': 0,
  },
};
