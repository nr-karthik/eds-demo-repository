module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:json/recommended',
    'plugin:xwalk/recommended',
    'plugin:prettier/recommended', // 👈 Add this line
    'prettier'                     // 👈 Add this line to disable conflicting rules
  ],
  plugins: ['prettier'], // 👈 Add this if not present
  env: {
    browser: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }],
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': [2, { props: false }],
    'prettier/prettier': 'error' // 👈 Show Prettier issues as ESLint errors
  }
};
