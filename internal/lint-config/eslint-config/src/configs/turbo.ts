import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import { interopDefault } from '../utils';

export async function turbo(): Promise<Linter.Config[]> {
  const [turboEslint] = await Promise.all([
    interopDefault(import('eslint-config-turbo')),
  ] as const);

  return defineConfig({
    plugins: {
      turbo: turboEslint,
    },
  });
}
