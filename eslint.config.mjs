import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  rules: {
    'antfu/no-top-level-await': 'off',
    'node/prefer-global/process': 'off',
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
});
