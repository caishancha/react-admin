import type { UserConfig } from 'vite';

import type { DefineApplicationOptions } from '../typing.ts';

import { defineConfig, loadEnv, mergeConfig } from 'vite';

import { defaultImportmapOptions, getDefaultPwaOptions } from '../options.ts';
import { loadApplicationPlugins } from '../plugins/index.ts';
import { loadAndConvertEnv } from '../utils/env.ts';
import { getCommonConfig } from './common.ts';

function defineApplicationConfig(userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async config => {
    // 获取用户自定义Vite配置
    const options = await userConfigPromise?.(config);
    // 获取环境变量
    const { appTitle, base, port, ...envConfig } = await loadAndConvertEnv();
    const { command, mode } = config;
    const { application = {}, vite = {} } = options || {};
    const root = process.cwd();
    const isBuild = command === 'build';
    const env = loadEnv(mode, root);

    const plugins = await loadApplicationPlugins({
      archiver: true,
      archiverPluginOptions: {},
      compress: false,
      compressTypes: ['brotli', 'gzip'],
      env,
      extraAppConfig: true,
      html: true,
      i18n: true,
      importmapOptions: defaultImportmapOptions,
      injectAppLoading: true,
      injectMetadata: true,
      isBuild,
      license: true,
      mode,
      nitroMock: !isBuild,
      nitroMockOptions: {},
      print: !isBuild,
      printInfoMap: {
        'React Admin Docs': 'https://github.com/caishancha/react-admin',
      },
      pwa: true,
      pwaOptions: getDefaultPwaOptions(appTitle),
      ...envConfig,
      ...application,
    });

    const applicationConfig: UserConfig = {
      base,
      build: {
        rollupOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'jse/index-[name]-[hash].js',
          },
        },
        target: 'es2015',
      },
      esbuild: {
        drop: isBuild ? ['console', 'debugger'] : [],
        legalComments: 'none',
      },
      resolve: {
        alias: {
          '#': '/src',
        },
      },
      plugins,
      server: {
        host: true,
        port,
        warmup: {
          // 预热文件
          clientFiles: [
            './index.html',
            './src/bootstrap.tsx',
            './src/{views,layouts,router,store,api,adapter}/*',
          ],
        },
      },
    };

    const mergedCommonConfig = mergeConfig(
      await getCommonConfig(),
      applicationConfig,
    );
    return mergeConfig(mergedCommonConfig, vite);
  });
}

export { defineApplicationConfig };
