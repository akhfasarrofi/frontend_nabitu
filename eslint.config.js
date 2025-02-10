import antfu, { combine, imports, jsdoc } from '@antfu/eslint-config'

export default combine(
  imports({
    stylistic: {
      indent: 'tab',
      semi: true,
      quotes: 'double',
    },
  }),
  jsdoc({
    stylistic: {
      indent: 'tab',
      semi: true,
      quotes: 'double',
    },
  }),
  antfu({
    ignores: [
      '**/__generated__/**',
      '**/README.md',
      '**/postcss.config.js',
      '**/docker-compose.yml',
    ],
    rules: {
      'no-console': ['warn', { allow: ['error', 'debug'] }],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'require-await': ['error'],
      'perfectionist/sort-imports': ['error', {
        internalPattern: ['@/**'],
      }],
      'node/prefer-global/buffer': ['off'],
      'no-unused-vars': ['error'],
      'dot-notation': ['off'],
      'jsdoc/check-param-names': ['error'],
      'jsdoc/require-property': ['error'],
      'jsdoc/require-returns-description': ['error'],
      'jsdoc/require-returns-check': ['error'],
    },
  }),
)
