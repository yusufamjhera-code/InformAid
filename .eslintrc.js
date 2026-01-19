module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'no-duplicate-imports': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }]
  }
}; 