module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // Ignore unused args but require usage of all others
    'no-unused-vars': ['warn', { 'args': 'none' }],
    // v-html vue component dangerously renders HTML
    'vue/no-v-html': 'off',
    // No single if in an "else" block
    'no-lonely-if': 2,
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
    }]
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
