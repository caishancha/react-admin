import type { Linter } from 'eslint';

import { javascript, ignores, typescript, react, prettier } from './configs';
import { restrictedConfig } from './restricted-config';

type FlatConfig = Linter.Config;

type FlatConfigPromise =
  | FlatConfig
  | FlatConfig[]
  | Promise<FlatConfig>
  | Promise<FlatConfig[]>;

async function defineConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromise[] = [
    javascript(),
    ignores(),
    typescript(),
    react(),
    ...restrictedConfig,
    ...config,
    prettier(),
  ];

  const resolved = await Promise.all(configs);
  return resolved.flat();
}

export { defineConfig };
