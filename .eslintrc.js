// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*', '**/__tests__/*'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
