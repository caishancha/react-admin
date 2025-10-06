import { defineConfig } from '@react-admin/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      injectAppLoading: false,
    },
    vite: {
      server: {
        proxy: {
          '/dev-api': {
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:8080/api',
            ws: true,
          },
        },
      },
    },
  };
});
