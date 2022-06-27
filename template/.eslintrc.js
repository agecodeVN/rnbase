module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['import'],
  rules: {
    'import/no-unresolved': 'error',
    'prettier/prettier': 'error',
    semi: ['error', 'never'],
    'react-hooks/exhaustive-deps': 'warn',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': 'off'
  },
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  }
};
