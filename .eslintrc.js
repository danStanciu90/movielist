module.exports = {
  extends: [
    '@lego/eslint-config-typescript',
    '@lego/eslint-config-react',
    '@lego/eslint-config-prettier',
  ],
  rules: {
    complexity: ['error', 14],
    'max-lines-per-function': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-no-bind': 'off',
    'react/no-array-index-key': 'off',
    'react/display-name': 'off',
    'react/jsx-no-useless-fragment': 'off',
  },
};
