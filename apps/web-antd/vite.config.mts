import { defineConfig } from '@react-admin/vite-config';
import { tailwindcss } from '@react-admin/tailwindcss-config';

export default defineConfig(async () => {
  return {
    application: {
      injectAppLoading: false,
    },
    vite: {
      plugins: [tailwindcss()],
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
