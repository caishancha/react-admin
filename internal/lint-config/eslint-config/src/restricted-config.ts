import type { Linter } from 'eslint';

// 忽略限制导入文件列表
const restrictedImportIgnores = [
  '**/vite.config.mts',
  '**/tailwind.config.mjs',
  '**/postcss.config.mjs',
];

export const restrictedConfig: Linter.Config[] = [
  // shadcn-ui 内部组件是自动生成的，不做太多限制
  {
    files: ['packages/@core/ui-kit/shadcn-ui/**/**'],
  },
  // @core内部应用，不能引入@react-admin/* 里面的包
  {
    files: ['packages/@core/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@react-admin/*'],
              message:
                'The @core package cannot import the @react-admin package, please use the @core package itself',
            },
          ],
        },
      ],
    },
  },
  {
    // @core/base内部应用，不能引入@react-admin/* 或者 @react-admin-core/* 里面的包
    files: ['packages/@core/base/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@react-admin/*', '@react-admin-core/*'],
              message:
                'The @core/base package cannot import the @react-admin or @react-admin-core package, please use the @core/base package itself',
            },
          ],
        },
      ],
    },
  },

  // {
  //   // 不能引入@react-admin/*里面的包
  //   files: [
  //     'packages/types/**/**',
  //     'packages/utils/**/**',
  //     'packages/icons/**/**',
  //     'packages/constants/**/**',
  //     'packages/styles/**/**',
  //     'packages/stores/**/**',
  //     'packages/preferences/**/**',
  //     'packages/locales/**/**',
  //   ],
  //   ignores: restrictedImportIgnores,
  //   rules: {
  //     'no-restricted-imports': [
  //       'error',
  //       {
  //         patterns: [
  //           {
  //             group: ['@react-admin/*'],
  //             message:
  //               'The @react-admin package cannot be imported, please use the @core package itself',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },
  // // 后端模拟代码，不需要太多规则
  // {
  //   files: ['apps/backend-mock/**/**', 'docs/**/**'],
  //   rules: {
  //     '@typescript-eslint/no-extraneous-class': 'off',
  //     'n/no-extraneous-import': 'off',
  //     'n/prefer-global/buffer': 'off',
  //     'n/prefer-global/process': 'off',
  //     'no-console': 'off',
  //     'unicorn/prefer-module': 'off',
  //   },
  // },
  // {
  //   files: ['**/**/playwright.config.ts'],
  //   rules: {
  //     'n/prefer-global/buffer': 'off',
  //     'n/prefer-global/process': 'off',
  //     'no-console': 'off',
  //   },
  // },
  // {
  //   files: ['internal/**/**', 'scripts/**/**'],
  //   rules: {
  //     'no-console': 'off',
  //   },
  // },
];
