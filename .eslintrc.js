module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react',
    'jsx-a11y',
    'import'
  ],
  'parserOptions': {
    'ecmaVersion': 8 // or 2017
  },
  'rules': {
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    'no-undef': ['warn', { 'typeof': true }],
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': true
    }]
  },
};