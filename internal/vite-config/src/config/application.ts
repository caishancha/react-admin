import type { CSSOptions, UserConfig } from 'vite';

import type { DefineApplicationOptions } from '../typing.ts';

import { NodePackageImporter } from 'sass';
import { defineConfig, loadEnv, mergeConfig } from 'vite';
import postcssOKLabFunction from '@csstools/postcss-oklab-function';

import { defaultImportmapOptions, getDefaultPwaOptions } from '../options.ts';
import { loadApplicationPlugins } from '../plugins/index.ts';
import { loadAndConvertEnv } from '../utils/env.ts';
import { getCommonConfig } from './common.ts';
import { findMonorepoRoot } from '@react-admin/node-utils';
import path, { relative } from 'node:path';

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

    const { injectGlobalScss = true } = application;

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
      css: {
        ...createCssOptions(injectGlobalScss),
        postcss: {
          plugins: [postcssOKLabFunction()],
        },
      },
      esbuild: {
        drop: isBuild ? ['console', 'debugger'] : [],
        legalComments: 'none',
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

function createCssOptions(injectGlobalScss = true): CSSOptions {
  const root = findMonorepoRoot();
  return {
    preprocessorOptions: injectGlobalScss
      ? {
          scss: {
            additionalData: (content: string, filepath: string) => {
              const relativePath = relative(root, filepath);
              // apps下的包注入全局样式
              if (relativePath.startsWith(`apps${path.sep}`)) {
                return `@use "@react-admin/styles/global" as *;\n${content}`;
              }
              return content;
            },
            importers: [new NodePackageImporter()],
          },
        }
      : {},
  };
}

export { defineApplicationConfig };
