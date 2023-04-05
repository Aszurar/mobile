module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'sort-imports': [
          'error',
          { ignoreCase: true, ignoreDeclarationSort: true },
        ],
        'import/order': [
          'error',
          {
            groups: [
              ['external', 'builtin'],
              'internal',
              ['sibling', 'parent'],
              'index',
            ],
            pathGroups: [
              {
                pattern:
                  '{react*,react-*,@react*,@react-*,@react*/**,@react-*/**,styled-components/**}',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '{@context/**,@hooks/**,@services/**}',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '{@icons/**,@images/**}',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '{@styles/**,@utils/**}',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '{@routes/**,@screens/**}',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '{@atoms/**,@molecules/**,@organisms/**,./styles}',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['internal', 'react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'desc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
