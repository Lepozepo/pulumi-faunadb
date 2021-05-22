module.exports = {
  extends: [
    'airbnb',
  ],
  rules: {
    'no-underscore-dangle': 0,
    'max-len': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  parser: '@babel/eslint-parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.json'],
      },
    },
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
    // 'jest/globals': true,
  },
};
