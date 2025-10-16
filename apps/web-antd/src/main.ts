import { initPreferences } from '@react-admin/preferences';
import { unmountGlobalLoading } from '@react-admin/utils';

import { overridesPreferences } from './preferences.ts';

/**
 * 页面加载渲染进行应用初始化
 */
async function initApplication() {
  // name用于指定项目唯一标识
  // 用于区分不同项目的偏好设置以及存储数据的key前缀以及其他一些需要隔离的数据
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  initPreferences({
    namespace,
    overrides: overridesPreferences,
  });

  // 启动应用并挂载 React 应用主要逻辑和视图
  const { bootstrap } = await import('./bootstrap.tsx');
  await bootstrap(namespace);

  // 移除并销毁loading
  unmountGlobalLoading();
}

initApplication();
