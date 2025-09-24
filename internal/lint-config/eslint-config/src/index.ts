import type { Linter } from 'eslint';

import {
  javascript,
  ignores,
  typescript,
  react,
  prettier,
  turbo,
  restricted,
} from './configs/index.ts';

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
    turbo(),
    restricted(),
    ...config,
    prettier(),
  ];

  const resolved = await Promise.all(configs);
  return resolved.flat();
}

export { defineConfig };
