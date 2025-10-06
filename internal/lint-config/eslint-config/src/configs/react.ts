import { type Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import { interopDefault } from '../utils.ts';

export async function react(): Promise<Linter.Config[]> {
  const [reactEslint, reactHooks, reactRefresh] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
  ] as const);
  return defineConfig({
    files: ['**/*.?([cm])[jt]s?(x)'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      sourceType: 'module',
    },
    plugins: {
      react: reactEslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // ====== eslint-plugin-react 规则 ======
      'react/prop-types': 'error',
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      // ====== eslint-plugin-react-hooks 规则 ======
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useMyCustomHook)', // 指定需要检查的自定义 Hooks
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      // ====== eslint-plugin-react-refresh 规则 ======
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
        },
      ],
    },
  });
}
