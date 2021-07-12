module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/setup.js'],
  transformIgnorePatterns: [
    //"node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
    'node_modules/?!(v-icon)',
  ],
}
