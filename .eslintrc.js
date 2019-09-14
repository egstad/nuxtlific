module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    // Ignore unused args but require usage of all others
    'no-unused-vars': ['warn', { 'args': 'none' }],
    // v-html vue component dangerously renders HTML
    'vue/no-v-html': 'off',
    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Enforce import order
    'import/order': 2,
    // Imports should come first
    'import/first': 2,
    // Other import rules
    'import/no-mutable-exports': 2,
    // Allow unresolved imports
    'import/no-unresolved': 0,
    // Allow async-await
    'generator-star-spacing': 0,
    // Prefer const over let
    'prefer-const': [2, {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],

    // No single if in an "else" block
    'no-lonely-if': 2,

    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: [2, 'all'],

    // No async function without await
    'require-await': 2,

    // Force dot notation when possible
    'dot-notation': 2,

    'no-var': 2,

    // Force object shorthand where possible
    'object-shorthand': 2,

    // No useless destructuring/importing/exporting renames
    'no-useless-rename': 2,

    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
  }
}
