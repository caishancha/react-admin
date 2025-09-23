import type { Linter } from 'eslint';
import { interopDefault } from '../utils';
import { defineConfig } from 'eslint/config';

export async function prettier(): Promise<Linter.Config[]> {
  const [prettierEslint] = await Promise.all([
    interopDefault(import('eslint-plugin-prettier/recommended')),
  ] as const);
  return defineConfig(prettierEslint);
}
