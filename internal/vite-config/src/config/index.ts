import type { DefineConfig } from '../typing.ts';

import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { defineApplicationConfig } from './application.ts';
import { defineLibraryConfig } from './library.ts';

export * from './application.ts';
export * from './library.ts';

function defineConfig(
  userConfigPromise?: DefineConfig,
  type: 'application' | 'auto' | 'library' = 'auto',
) {
  let projectType = type;

  // 根据包是否存在 index.html,自动判断类型
  if (projectType === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html');
    projectType = existsSync(htmlPath) ? 'application' : 'library';
  }

  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise);
    }
    case 'library': {
      return defineLibraryConfig(userConfigPromise);
    }
    default: {
      throw new Error(`Unsupported project type: ${projectType}`);
    }
  }
}

export { defineConfig };
